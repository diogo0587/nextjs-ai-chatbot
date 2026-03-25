window.API = {
  repos: {
    async list(){
      return [
        {name:"nomacode-core", path:"/workspace/nomacode-core"},
        {name:"android-agent", path:"/workspace/android-agent"}
      ];
    }
  },
  sessions: {
    async list(){
      return [
        {id:"abc12345", tool:"bash", pid:1234}
      ];
    }
  },
  tools: {
    async list(){
      return {
        available:[
          {id:"bash", name:"Bash", description:"Terminal shell"},
          {id:"codex", name:"Codex", description:"AI coding agent"}
        ],
        unavailable:[
          {id:"claude-code", name:"Claude Code"},
          {id:"opencode", name:"OpenCode"}
        ]
      }
    }
  }
};