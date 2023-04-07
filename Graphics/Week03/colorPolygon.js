var gl;

window.onload = function init()
{
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if( !gl ) {
        alert("WebGL isn't available!");
    }

    var vertices = [ 
        vec2(-0.5, -0.5),
        vec2(-0.5,0.5),
        vec2(0.5, 0.5),
        vec2(0.5, -0.5),

        vec2(-0.5, -0.5),
        vec2(-0.5, 0.5),
        vec2(0.5, 0.5),
        vec2(0.5, -0.5)
    ];
    var colors = [
        vec4(1,0,0,1),
        vec4(0,1,0,1),
        vec4(0,0,1,1),
        vec4(1,1,0,1),

        vec4(0, 0, 0, 1),
        vec4(0, 0, 0, 1),
        vec4(0, 0, 0, 1),
        vec4(0, 0, 0, 1)
        ];

    // Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    // Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);//flatten = 벡터를 사용해도 gpu메모리에 맞게 바꿔주는 함수

    // Associate our shader variables with our data buffer
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    var cbufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,cbufferId);
    gl.bufferData(gl.ARRAY_BUFFER,flatten(colors),gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program,"vColor");
    gl.vertexAttribPointer(vColor,4,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(vColor);
    render();
};

function render()
{
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);  //0 = 처음 시작하는 인덱스 
    gl.drawArrays(gl.LINE_LOOP,4,4)
    //STRIP = 이전에 2개를 가지고 그림 
    //FAN = 부채꼴 1번 선을 가지고 이어감 123,134,145,,,, 이런식 

}
