module.exports = {
  run: [{
    // differentialdiffusion
    method: "shell.run",
    params: {
      message: [
        "git clone https://huggingface.co/spaces/cocktailpeanut/differential-diffusion app",
      ]
    }
  }, {
    when: "{{gpu === 'nvidia'}}",
    method: "shell.run",
    params: {
      venv: "env",
      path: "app",
      message: "uv pip install -r requirements.txt",
    }
  }, {
    when: "{{gpu !== 'nvidia'}}",
    method: "shell.run",
    params: {
      venv: "env",
      path: "app",
      message: "uv pip install -r requirements-mps.txt",
    }
  }, {
    // depthanything
    method: "shell.run",
    params: {
      message: [
        "git clone https://github.com/peanutcocktail/Depth-Anything depth_anything"
      ],
      path: "app"
    }
  }, {
    method: "shell.run",
    params: {
      venv: "../env",
      path: "app/depth_anything",
      message: [
        "uv pip install -r requirements.txt"
      ],
    }
  }, {
    method: "shell.run",
    params: {
      venv: "app/env",
      message: [
        "uv pip install -r depth-requirements.txt",
        "uv pip install transformers"
      ],
    }
  }, {
    method: "script.start",
    params: {
      uri: "torch.js",
      params: {
        venv: "env",
        path: "app",
        // xformers: true   // uncomment this line if your project requires xformers
        // triton: true   // uncomment this line if your project requires triton
        // sageattention: true   // uncomment this line if your project requires sageattention
      }
    }
  }, {
    method: "notify",
    params: {
      html: "Click the 'start' tab to get started!"
    }
  }]
}