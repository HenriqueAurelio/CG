function main()
{
  var stats = initStats();          // To show FPS information
  var scene = new THREE.Scene();    // Create main scene
  var renderer = initRenderer();    // View function in util/utils
  var camera = initCamera(new THREE.Vector3(0, -30, 15)); // Init camera in this position
  var clock = new THREE.Clock();

  // Show text information onscreen
  showInformation();

  // To use the keyboard
  var keyboard = new KeyboardState();

  // Enable mouse rotation, pan, zoom etc.
  var trackballControls = new THREE.TrackballControls(camera, renderer.domElement );

  // Show axes (parameter is size of each axis)
  var axesHelper = new THREE.AxesHelper( 12 );
  scene.add( axesHelper );

  // create the ground plane
  var planeGeometry = new THREE.PlaneGeometry(20, 20);
  planeGeometry.translate(0.0, 0.0, -0.02); // To avoid conflict with the axeshelper
  var planeMaterial = new THREE.MeshBasicMaterial({
      color: "rgb(150, 150, 150)",
      side: THREE.DoubleSide
  });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  // add the plane to the scene
  scene.add(plane);

  // create a cube
  var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  var cubeMaterial = new THREE.MeshNormalMaterial();
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  // position the cube
  cube.position.set(0.0, 0.0, 2.0);
  // add the cube to the scene
  scene.add(cube);

  // Listen window size changes
  window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

  render();
  var camPos = new THREE.Vector3(1,0,0);
  var camLook = new THREE.Vector3(0,0,0);
  var camUp = new THREE.Vector3(0,0,1);
  var posX = 0;
  var posZ = 15;
  var lookZ = 0;
  var lookX = 0;

  function keyboardUpdate() {

    keyboard.update();
    if ( keyboard.pressed("left") )   
    {
        posX -= 1;
    }
    if ( keyboard.pressed("right") )  
    {
        posX += 1;
    }
    if ( keyboard.pressed("up") )  
    {  
        posZ += 1;
    }
    if ( keyboard.pressed("down") )
    { 
        posZ -= 1;
    }
    if ( keyboard.pressed("A") )
    {
        lookX-= 1;
    }          
    if ( keyboard.pressed("D") ) 
    { 
        lookX += 1;
    }
    if ( keyboard.pressed("W") ) 
    {
        lookZ += 1;
    } 
    if ( keyboard.pressed("S") )
    { 
        lookZ -= 1;
    }
    if ( keyboard.pressed("space") ) cube.position.set(0.0, 0.0, 2.0);
      
    if( keyboard.pressed("Q" ))
    {
        camUp.setX(camUp.getComponent(0)+0.05);
        camUp.setZ(camUp.getComponent(2)-0.05);

    }
    if( keyboard.pressed("E"))
    {
        camUp.setX(camUp.getComponent(0)-0.05);
        camUp.setZ(camUp.getComponent(2)+0.05);

    }
    camLook.x=lookX;
    camLook.z=lookZ;
    camPos.x=posX;
    camPos.z=posZ;
    // changeCamera(camPos,camLook,camUp);
  }

  /**
 * Initialize a simple camera and point it at the center of a scene
 *
 * @param {THREE.Vector3} [initialPosition]
 */
function changeCamera(position,look,upp) {
    // var position = (initialPosition !== undefined) ? initialPosition : new THREE.Vector3(-30, 40, 30);
    // camera.position.copy(position);
    // camera.lookAt(look); 
    // camera.up.set(upp.x,upp.y,upp.z);
    // return camera;
}
  function showInformation()
  {
    // Use this to show information onscreen
    controls = new InfoBox();
      controls.add("Keyboard Example");
      controls.addParagraph();
      controls.add("Press WASD keys to move continuously");
      controls.add("Press arrow keys to move in discrete steps");
      controls.add("Press SPACE to put the cube in its original position");
      controls.show();
  }

  function render()
  {
    stats.update(); // Update FPS
    requestAnimationFrame(render); // Show events
    trackballControls.update();
    keyboardUpdate();
    renderer.render(scene, camera) // Render scene
  }
}
