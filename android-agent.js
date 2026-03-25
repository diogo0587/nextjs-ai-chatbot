const { spawn, execSync } = require('child_process');

module.exports = (app)=>{

app.get('/api/android/screen', (req,res)=>{
  const p = spawn('adb',['exec-out','screencap','-p']);
  res.setHeader('Content-Type','image/png');
  p.stdout.pipe(res);
});

app.post('/api/android/tap', (req,res)=>{
  const {x,y} = req.body;
  execSync(`adb shell input tap ${x} ${y}`);
  res.json({ok:true});
});

app.post('/api/android/swipe', (req,res)=>{
  const {x1,y1,x2,y2} = req.body;
  execSync(`adb shell input swipe ${x1} ${y1} ${x2} ${y2} 300`);
  res.json({ok:true});
});

app.post('/api/android/text', (req,res)=>{
  const {text} = req.body;
  execSync(`adb shell input text \"${text}\"`);
  res.json({ok:true});
});

app.post('/api/android/key', (req,res)=>{
  const {key} = req.body;
  execSync(`adb shell input keyevent ${key}`);
  res.json({ok:true});
});

app.post('/api/exec', (req,res)=>{
  const {cmd} = req.body;
  try{
    const out = execSync(cmd).toString();
    res.json({output:out});
  }catch(e){
    res.json({error:e.toString()});
  }
});

};