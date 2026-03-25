const express = require('express');
const { spawn } = require('child_process');
const os = require('os');
const fs = require('fs');

const app = express();
app.use(express.json());

let sessions = {};

app.get('/api/tools', (req,res)=>{
  const tools = ['bash','node','python','git'];
  const available = tools.filter(t=>{
    try {
      require('child_process').execSync(`which ${t}`);
      return true;
    } catch { return false; }
  });
  res.json({available});
});

app.post('/api/shell', (req,res)=>{
  const id = Math.random().toString(36).slice(2);
  const shell = spawn('bash');
  sessions[id] = shell;
  res.json({id});
});

app.get('/api/android', (req,res)=>{
  const adb = spawn('adb',['devices']);
  let out='';
  adb.stdout.on('data',d=>out+=d);
  adb.on('close',()=>res.json({devices:out}));
});

app.listen(3000, ()=>console.log('Nomacode agent running'));