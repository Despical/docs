// Run render-v5.mjs first if the four complete preview playlists are not cached.
import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import sharp from 'sharp';

const root=process.cwd();
const source=path.join(root,'assets/frameui-storefront');
const cache=path.join(root,'.cache/frameui-storefront-v5');
const out=path.join(root,'public/images/frameui/storefront');
const ffmpeg=process.env.FFMPEG_PATH||'C:/Users/berke/AppData/Roaming/npm/node_modules/ffmpeg-static/ffmpeg.exe';
const label='Minecraft 1.21.11 – 26.3';
const font='Verdana,DejaVu Sans,sans-serif';
const probe=Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="100"><text x="0" y="70" font-family="${font}" font-size="20" font-weight="bold" fill="#f3daa3">${label}</text></svg>`);
const {data,info}=await sharp(probe).ensureAlpha().raw().toBuffer({resolveWithObject:true});
let left=info.width,right=-1,top=info.height,bottom=-1;
for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++)if(data[(y*info.width+x)*4+3]){
 left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y);
}
const width=right-left+1+36,height=bottom-top+1+28;
const x=1216-width,y=76;
const badge=`<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${height/2}" fill="#294953" stroke="#69898b"/><text x="${x+18-left}" y="${y+14-top+70}" font-family="${font}" font-size="20" font-weight="bold" fill="#f3daa3">${label}</text>`;
const svg=(await fs.readFile(path.join(source,'cover-v5.svg'),'utf8')).replace('<path d="M64 207H1216"',`${badge}<path d="M64 207H1216"`);
await fs.writeFile(path.join(source,'cover-v6.svg'),svg);
const base=path.join(cache,'cover-v6-base.png');
await sharp(Buffer.from(svg)).png().toFile(base);
const clips=['main','thumb-cosmic','thumb-color','thumb-ambient'].map(n=>path.join(cache,n+'.mp4'));
for(const file of clips)await fs.access(file).catch(()=>{throw new Error('Run node assets/frameui-storefront/render-v5.mjs before rendering this cover.');});
const args=['-y','-hide_banner','-loglevel','error','-threads','4','-filter_complex_threads','1','-loop','1','-framerate','20','-i',base];
for(const clip of clips)args.push('-i',clip);
args.push('-filter_complex','[0:v][1:v]overlay=64:246[a];[a][2:v]overlay=64:750[b];[b][3:v]overlay=456:750[c];[c][4:v]overlay=848:750,format=bgra','-t','18','-an','-c:v','libwebp_anim','-quality','90','-compression_level','5','-loop','0',path.join(out,'cover-v6.webp'));
await new Promise((resolve,reject)=>{
 const p=spawn(ffmpeg,args);let error='';p.stderr.on('data',b=>error+=b);p.on('error',reject);p.on('close',c=>c===0?resolve():reject(new Error(error)));
});
console.log('Rendered cover with the inclusive Minecraft version range.');
