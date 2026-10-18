// Run from the docs root: node assets/frameui-storefront/render-v4.mjs
// Every preview uses the complete gallery video, including its Minecraft scene.
import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import sharp from 'sharp';

const root = process.cwd();
const source = path.join(root, 'assets/frameui-storefront');
const media = path.join(root, 'public/images/frameui');
const output = path.join(media, 'storefront');
const temp = path.join(root, '.cache/frameui-storefront-v4');
const ffmpeg = process.env.FFMPEG_PATH || 'C:/Users/berke/AppData/Roaming/npm/node_modules/ffmpeg-static/ffmpeg.exe';
await fs.mkdir(temp, { recursive: true });
const fps = 20;
const definitions = `<defs>
 <linearGradient id="navy" x2="1" y2="1"><stop stop-color="#101e30"/><stop offset=".55" stop-color="#182b42"/><stop offset="1" stop-color="#103e43"/></linearGradient>
 <linearGradient id="gold"><stop stop-color="#ba8a42"/><stop offset=".5" stop-color="#f6dda1"/><stop offset="1" stop-color="#bb8d48"/></linearGradient>
 <linearGradient id="teal" x2="1" y2="1"><stop stop-color="#235461"/><stop offset="1" stop-color="#13363f"/></linearGradient>
 <linearGradient id="violet" x2="1" y2="1"><stop stop-color="#4a416e"/><stop offset="1" stop-color="#2c294c"/></linearGradient>
 <linearGradient id="warm" x2="1" y2="1"><stop stop-color="#77513c"/><stop offset="1" stop-color="#3f3341"/></linearGradient>
 <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#93bdcc" stroke-opacity=".055"/></pattern>
 </defs>`;
const background = h => `<rect width="1280" height="${h}" rx="24" fill="url(#navy)"/><rect width="1280" height="${h}" rx="24" fill="url(#grid)"/><g fill="none" stroke="#83b9b5" opacity=".11"><circle cx="1280" cy="0" r="380"/><circle cx="1280" cy="0" r="310"/><circle cx="0" cy="${h}" r="280"/><circle cx="0" cy="${h}" r="215"/></g>`;
const svg = (h, content) => `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="${h}" viewBox="0 0 1280 ${h}">${definitions}<g font-family="Verdana,DejaVu Sans,sans-serif">${content}</g></svg>`;
const frame = (x, y, w, h) => `<rect x="${x-5}" y="${y-5}" width="${w+10}" height="${h+10}" rx="9" fill="#101c2b" stroke="#bc9a5b" stroke-width="2"/><rect x="${x-2}" y="${y-2}" width="${w+4}" height="${h+4}" fill="#101c2b"/>`;
const cream = h => `${background(h)}<rect x="24" y="24" width="1232" height="${h-48}" rx="25" fill="#f5f1e7"/><path d="M80 162H1200" stroke="#d4c4a1"/>`;
const heading = (title, subtitle) => `<text x="640" y="97" text-anchor="middle" fill="#172e40" font-size="41" font-weight="bold">${title}</text><text x="640" y="140" text-anchor="middle" fill="#52666e" font-size="20">${subtitle}</text>`;
async function art(name, h, content) {
 const s = svg(h, content);
 await fs.writeFile(path.join(source, `${name}-v4.svg`), s);
 await sharp(Buffer.from(s)).png().toFile(path.join(temp, `${name}-base.png`));
}

await art('cover', 1020, `${background(1020)}
 <text x="64" y="124" font-size="80" font-weight="bold" fill="#fff4d8">FRAME<tspan fill="#e7bb70">UI</tspan></text>
 <text x="66" y="173" font-size="27" fill="#c4d8dc">Make every arrival an experience.</text>
 <rect x="920" y="68" width="296" height="54" rx="27" fill="#294953" stroke="#69898b"/><text x="1068" y="103" text-anchor="middle" fill="#f3daa3" font-size="20" font-weight="bold">60 effects. Your world.</text>
 <path d="M64 207H1216" stroke="url(#gold)" stroke-opacity=".55"/>
 ${frame(64,246,736,414)}
 <rect x="830" y="241" width="386" height="424" rx="14" fill="#f5f1e7"/>
 ${[['50 animations','Movement with personality.'],['10 complete designs','Ready to become your own.'],['A visual browser editor','Create. Preview. Save live.'],['28 languages','Made for your community.']].map(([t,s],i)=>`<circle cx="855" cy="${284+i*92}" r="4" fill="#a78043"/><text x="876" y="${292+i*92}" fill="#183848" font-size="24" font-weight="bold">${t}</text><text x="854" y="${325+i*92}" fill="#556971" font-size="18">${s}</text>`).join('')}
 <text x="64" y="713" fill="#e8cd94" font-size="22" font-weight="bold">A different mood. The same world underneath.</text>
 ${[64,456,848].map(x=>frame(x,750,368,207)).join('')}
 <text x="640" y="995" text-anchor="middle" fill="#a9c7cd" font-size="17">Full transitions • Custom colors • Your server’s identity</text>`);

await art('motion', 1040, `${cream(1040)}${heading('Find the motion that fits your world.','From cosmic depth to quiet blossoms. Every entrance has an exit.')}
 ${[[64,202],[664,202],[64,590],[664,590]].map(([x,y])=>frame(x,y,552,311)).join('')}
 <text x="340" y="554" text-anchor="middle" fill="#40606d" font-size="18">A journey through the stars.</text><text x="940" y="554" text-anchor="middle" fill="#40606d" font-size="18">A little atmosphere. A lot of depth.</text>
 <text x="340" y="946" text-anchor="middle" fill="#40606d" font-size="18">A ripple into somewhere new.</text><text x="940" y="946" text-anchor="middle" fill="#40606d" font-size="18">A softer welcome to your world.</text>
 <text x="640" y="1000" text-anchor="middle" fill="#856337" font-size="18" font-weight="bold">YOUR COLORS  •  YOUR TIMING  •  YOUR OWN VARIATION</text>`);

await art('themes', 940, `${cream(940)}${heading('Give your world its own atmosphere.','A complete starting point. A look that becomes unmistakably yours.')}${frame(80,196,1120,630)}<text x="640" y="890" text-anchor="middle" fill="#856337" font-size="18" font-weight="bold">CUSTOM IMAGES  •  PERSONAL CAPTIONS  •  A FINISHED LOOK</text>`);
await art('studio', 940, `${cream(940)}${heading('Create it. Preview it. Make it yours.','Your canvas, your palette and a live connection to your server.')}${frame(80,196,1120,630)}<text x="640" y="890" text-anchor="middle" fill="#856337" font-size="18" font-weight="bold">LIVE PREVIEW  •  DRAG &amp; RESIZE  •  IMPORT &amp; SAVE</text>`);

await art('playback', 680, `${background(680)}<text x="640" y="93" text-anchor="middle" fill="#fff0ce" font-size="40" font-weight="bold">Choose when the experience begins.</text><text x="640" y="137" text-anchor="middle" fill="#bbd1da" font-size="22">Every welcome and every journey can have its own identity.</text>
 ${[['JOIN','A welcome worth remembering.','teal'],['TELEPORT','Turn travel into an experience.','violet'],['WORLD CHANGE','A new place. A new atmosphere.','warm']].map(([t,s,c],i)=>{const x=64+i*392;return `<rect x="${x}" y="190" width="368" height="190" rx="18" fill="url(#${c})" stroke="#bba06b" stroke-opacity=".65"/><circle cx="${x+40}" cy="233" r="13" fill="none" stroke="#f0d394" stroke-width="2"/><path d="M${x+33} 233h14m-5-5 5 5-5 5" fill="none" stroke="#f0d394" stroke-width="2"/><text x="${x+27}" y="292" fill="#f7e4b7" font-size="24" font-weight="bold">${t}</text><text x="${x+27}" y="337" fill="#d4e2e7" font-size="16">${s}</text>`}).join('')}
 <path d="M248 394v36h784v-36M640 430v35" fill="none" stroke="#c6aa71" stroke-width="2"/><circle cx="640" cy="430" r="6" fill="#e6c78b"/>
 <rect x="182" y="470" width="916" height="113" rx="18" fill="url(#teal)" stroke="#c3aa74"/><text x="640" y="515" text-anchor="middle" fill="#ffe9b7" font-size="26" font-weight="bold">YOUR PLAYBACK RULES</text><text x="640" y="553" text-anchor="middle" fill="#c9e0df" font-size="20">Permissions  •  Worlds  •  Cooldowns  •  Priorities  •  Weights</text>
 <text x="640" y="637" text-anchor="middle" fill="#a8c5ce" font-size="17">Choose events in Studio. Enable automatic playback when you are ready.</text>`);
await sharp(path.join(temp,'playback-base.png')).webp({quality:95}).toFile(path.join(output,'playback-v4.webp'));

function run(args) {
 return new Promise((resolve,reject)=>{
  const p=spawn(ffmpeg,['-y','-hide_banner','-loglevel','error','-threads','4','-filter_complex_threads','1',...args]);
  let err=''; p.stderr.on('data',b=>err+=b);p.on('error',reject);p.on('close',c=>c===0?resolve():reject(new Error(err)));
 });
}
const label = n => ({frameui:'FRAMEUI SIGNATURE','nether-forge':'NETHER FORGE','cherry-valley':'CHERRY VALLEY',overworld:'OVERWORLD'}[n] || n.toUpperCase());
async function clip(n,w,h,seconds=6,badge=true) {
 const target=path.join(temp,`${n}-${w}-${seconds}-${badge}-full.mp4`);
 try {if((await fs.stat(target)).size>1000)return target;}catch{}
 // Repeat very short complete transitions instead of leaving a long blank hold.
 const durations={warp:2,ripple:2.8,hexagon:2.2,matrix:2.7};
 const repeats=Math.max(1,Math.floor(seconds/(durations[n]||seconds)));
 const input=['-stream_loop',String(repeats-1),'-i',path.join(media,`${n}.mp4`)];
 let filter=`[0:v]fps=${fps},scale=${w}:${h}:flags=lanczos,tpad=stop_mode=clone:stop_duration=${seconds},trim=duration=${seconds},setpts=PTS-STARTPTS[v]`;
 if(badge){
  const text=label(n),size=w<600?19:23,bw=Math.round(text.length*size*.71+32),bh=size+20;
  const png=path.join(temp,`${n}-${w}-badge.png`);
  await sharp(Buffer.from(`<svg width="${bw}" height="${bh}" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="${bw-2}" height="${bh-2}" rx="7" fill="#102a37" fill-opacity=".94" stroke="#e7c484"/><text x="16" y="${size+8}" font-family="Verdana" font-size="${size}" font-weight="bold" fill="#ffe8b6">${text}</text></svg>`)).png().toFile(png);
  input.push('-i',png);filter+=';[v][1:v]overlay=14:14[out]';
 }else filter+=';[v]null[out]';
 await run([...input,'-filter_complex',filter,'-map','[out]','-an','-c:v','libx264','-crf','15','-preset','fast','-pix_fmt','yuv444p',target]);
 return target;
}
async function playlist(name,names,w,h) {
 const files=[];for(const n of names) files.push(await clip(n,w,h));
 const list=path.join(temp,`${name}.txt`);await fs.writeFile(list,files.map(p=>`file '${p.replaceAll('\\','/')}'`).join('\n'));
 const target=path.join(temp,`${name}.mp4`);await run(['-f','concat','-safe','0','-i',list,'-c','copy',target]);return target;
}
async function render(name,inputs,filters,seconds) {
 const args=['-loop','1','-framerate',String(fps),'-i',path.join(temp,`${name}-base.png`)];
 for(const input of inputs)args.push('-i',input);
 await run([...args,'-filter_complex',`${filters},format=bgra`,'-t',String(seconds),'-an','-c:v','libwebp_anim','-quality','90','-compression_level','5','-loop','0',path.join(output,`${name}-v4.webp`)]);
 console.log(`${name}: ${((await fs.stat(path.join(output,`${name}-v4.webp`))).size/1048576).toFixed(2)} MiB`);
}
const main=await playlist('main',['nether-forge','cherry-valley','overworld'],736,414);
const a=await playlist('thumb-cosmic',['nebula','warp','starfield'],368,207);
const b=await playlist('thumb-color',['prism','ripple','hexagon'],368,207);
const c=await playlist('thumb-ambient',['matrix','fireflies','sakura'],368,207);
await render('cover',[main,a,b,c],'[0:v][1:v]overlay=64:246[a];[a][2:v]overlay=64:750[b];[b][3:v]overlay=456:750[c];[c][4:v]overlay=848:750',18);
const four=[];for(const n of ['warp','nebula','ripple','sakura'])four.push(await clip(n,552,311));
await render('motion',four,'[0:v][1:v]overlay=64:202[a];[a][2:v]overlay=664:202[b];[b][3:v]overlay=64:590[c];[c][4:v]overlay=664:590',6);
const themes=await playlist('themes',['cherry-valley','overworld','nether-forge'],1120,630);
await render('themes',[themes],'[0:v][1:v]overlay=80:196',18);
const signature=await clip('frameui',637,358,6,false);
await render('studio',[path.join(media,'studio-desktop.webp'),signature],'[1:v]scale=1120:630[ui];[ui][2:v]overlay=217:152[screen];[0:v][screen]overlay=80:196',6);
await fs.writeFile(path.join(source,'v4-manifest.json'),JSON.stringify({fps,loop:0,quality:90,completeSourceCycles:true,cover:{main:['nether-forge','cherry-valley','overworld'],thumbnails:[['nebula','warp','starfield'],['prism','ripple','hexagon'],['matrix','fireflies','sakura']]},motion:['warp','nebula','ripple','sakura'],themes:['cherry-valley','overworld','nether-forge'],studio:'frameui'},null,2)+'\n');
