function main()
{
  var stats = initStats();          // To show FPS information
  var scene = new THREE.Scene();    // Create main scene
  var renderer = initRenderer();    // View function in util/utils
  var camera = initCamera(new THREE.Vector3(0, -100, -50)); // Init camera in this position
  camera.up.set(0,0,1);
  var light = initDefaultLighting(scene, new THREE.Vector3(0, -100, -50)); // Use default light
  light.up.set(0,0,1);
  var speed = 0;
  var maxspeed = 10;
  var virado = 0;
  var virEsq = 0;
  var virDir = 0;
  var direcao;
  // Enable mouse rotation, pan, zoom etc.
  var trackballControls = new THREE.TrackballControls( camera, renderer.domElement );

  // Show axes (parameter is size of each axis)
  var axesHelper = new THREE.AxesHelper( 12 );
  scene.add( axesHelper );

  // create the ground plane with wireframe
  var planeGeometry = new THREE.PlaneGeometry(1000, 1000, 40, 40);
  planeGeometry.translate(0.0, 0.0, -0.02); // To avoid conflict with the axeshelper
  var planeMaterial = new THREE.MeshBasicMaterial({
      color: "rgba(20, 30, 110)",
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: 1, // positive value pushes polygon further away
      polygonOffsetUnits: 1
  });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  scene.add(plane);

  var wireframe = new THREE.WireframeGeometry( planeGeometry );
  var line = new THREE.LineSegments( wireframe );
  line.material.color.setStyle( "rgb(180, 180, 180)" );  
  scene.add(line);

   // To use the keyboard
   var keyboard = new KeyboardState();

  //criando os pneus
  var pneu1 = createPneu(); 
  scene.add(pneu1);
  var pneu2 = createPneu();
  scene.add(pneu2);
  var pneu3 = createPneu();
  scene.add(pneu3);
  var pneu4 = createPneu();
  scene.add(pneu4);
  
  //criando os eixos
  var eixo1 = createEixo();
  scene.add(eixo1);
  var eixo2 = createEixo();
  scene.add(eixo2);

  //conectando pneus e posicionando-os
  eixo1.add(pneu1);
  pneu1.position.set(0.0, 20.0, 0.0);
  pneu1.rotateX(Math.PI/2);
  eixo1.add(pneu2);
  pneu2.position.set(0.0, -20.0, 0.0);
  pneu2.rotateX(Math.PI/2);
  eixo2.add(pneu3);
  pneu3.position.set(0.0,20.0,0.0);
  pneu3.rotateX(Math.PI/2);
  eixo2.add(pneu4);
  pneu4.position.set(0.0,-20.0,0.0);
  pneu4.rotateX(Math.PI/2);
  var rotacaoInicial = pneu4.rotation.x; 

  //criando o retângulo que conecta o eixo frontal ao bico
  var retanguloFrontal = createRetanguloFrontal();
  scene.add(retanguloFrontal);

  //Posicionando rentauglo frontal e conectando o eixo1 ao mesmo
  retanguloFrontal.position.set(20.0, 0.0, 5.0);
  retanguloFrontal.rotateX(Math.PI/2);
  retanguloFrontal.add(eixo1);
  eixo1.position.set(0.0, 0.0, 0.0);
  eixo1.rotateZ(Math.PI/2);


  //Criando o bico
  var bico = createBico();
  scene.add(bico);

  //Conectando o bico ao retangulo frontal e posicionando
  retanguloFrontal.add(bico);
  bico.position.set(0.0, 0.0,10.0);
  bico.rotateX(Math.PI/2);

  //Criando a base do kart
  var base = createBase();
  scene.add(base);

  //Conectando o retangulo frontal a base
  base.position.set(0.0,0.0,-20.0);
  retanguloFrontal.add(base);
  base.rotateX(Math.PI/2);

  //Criando o retângulo traseiro
  var retanguloTraseiro = createRetanguloTraseiro();
  scene.add(retanguloTraseiro);


  //Posicionando o retângulo traseiro e conectando o eixo ao retângulo traseiro,conectando a base ao retangulo traseiro
  base.add(retanguloTraseiro);
  retanguloTraseiro.position.set(0.0, -20.0, 0.0);
  retanguloTraseiro.rotateX(-Math.PI/2);
  retanguloTraseiro.add(eixo2);
  eixo2.position.set(0.0, 0.0, 0.0);
  eixo2.rotateZ(Math.PI/2);

  //Criando a traseira e conectando ao retângulo traseiro
  var traseira = createTraseira();
  scene.add(traseira);
  retanguloTraseiro.add(traseira);
  //Posicionando a traseira
  traseira.position.set(0.0,0.0,-5.0);

  //Criando a base do aerofolio
  var baseAerofolio1 = createBaseAerofolio();
  scene.add(baseAerofolio1);
  var baseAerofolio2 = createBaseAerofolio();
  scene.add(baseAerofolio2);

  //Conectando a base do aerofolio a traseira e posicionando a base do aerofolio
  traseira.add(baseAerofolio1);
  baseAerofolio1.position.set(10.0, 5.0, 0.0);
  baseAerofolio1.rotateX(Math.PI/2);
  traseira.add(baseAerofolio2);
  baseAerofolio2.position.set(-10.0, 5.0, 0.0);
  baseAerofolio2.rotateX(Math.PI/2);

  //Criando o aerofolio
  var aerofolio = createAerofolio();
  scene.add(aerofolio);
  aerofolio.add(camera);
  aerofolio.add(light);

  //Conectando o aerofolio as bases e posicionando o aerofolio
  aerofolio.position.set(10.0, 0.0, -6.0);
  baseAerofolio1.add(aerofolio);
  baseAerofolio2.add(aerofolio);

  //Criando o assento
  var assento = createAssento();
  scene.add(assento);

  //Conectando o assento a base e posicionando o assento
  base.add(assento);
  assento.position.set(0.0, 0.0, -2.0);

  //Criando o encosto
  var encosto = createEncosto();
  scene.add(encosto);

  //Conectando o encosto ao assento  e posicionando o encosto
  assento.add(encosto);
  encosto.position.set(0.0, -6.0, -6.0);

  //Criando o painel
  var painel = createPainel();
  scene.add(painel);

  //Conectando o painel a base e posicionando o painel
  base.add(painel);
  painel.position.set(0.0, 10.0, -6.0);

  //Criando o volante
  var volante = createVolante();
  scene.add(volante);

  //Conectando volante ao painel e posicionando o volante
  painel.add(volante);
  volante.position.set(0.0, -1.0, -1.0);
  volante.rotateX(Math.PI/2);
  // Use this to show information onscreen
  controls = new InfoBox();
    controls.add("Basic Scene");
    controls.addParagraph();
    controls.add("* Use a seta para cima para acelerar e a seta para baixo para desacelerar");
    controls.add("* Use as setas laterais para mudar a direção");
    controls.add("* Aperte espaço para o modo inspeção");
    controls.show();
    
 
  // Listen window size changes
  window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

  var projectionMessage = new SecondaryBox("Modo de Jogo");

  render();
  function changeProjection()
  {
    // Store the previous position of the camera
    var pos = new THREE.Vector3().copy(camera.position);

    if (camera instanceof THREE.PerspectiveCamera)
    {
      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
      projectionMessage.changeMessage("Modo Perspectivo");
    } else {
      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
      projectionMessage.changeMessage("Modo Jogo");
    }
    camera.position.copy(pos);
    camera.lookAt(scene.position);
    trackballControls = initTrackballControls(camera, renderer);
    lightFollowingCamera(light, camera) // Makes light follow the camera
  }

  function createPneu()
  {
    const pneuGeometry = new THREE.TorusGeometry(2.5,2.5, 10, 100 );
    const pneuMaterial = new THREE.MeshPhongMaterial( { color: 000000 } );
    const pneu = new THREE.Mesh( pneuGeometry, pneuMaterial );
    return pneu;
  }

  function createEixo()
  {
    const eixoColor = new THREE.Color("rgb(128, 128, 128)");
    const eixoGeometry = new THREE.CylinderGeometry(1, 1, 40);
    const eixoMaterial = new THREE.MeshPhongMaterial({color: eixoColor});
    const eixo = new THREE.Mesh(eixoGeometry, eixoMaterial);
    return eixo;
  }

  function createRetanguloFrontal()
  {
    const retanguloFrontalColor = new THREE.Color("#D72638");
    const retanguloFrontalGeometry = new THREE.BoxGeometry(15, 3, 20);
    const retanguloFrontalMaterial = new THREE.MeshPhongMaterial({color:retanguloFrontalColor});
    const retanguloFrontal = new THREE.Mesh(retanguloFrontalGeometry, retanguloFrontalMaterial);
    return retanguloFrontal;
  }

  function createBico()
  {
    const bicoColor = new THREE.Color("#3F88C5");
    const bicoGeometry = new THREE.BoxGeometry(30, 12, 4);
    const bicoMaterial = new THREE.MeshPhongMaterial({color: bicoColor});
    const bico = new THREE.Mesh(bicoGeometry, bicoMaterial);
    return bico;
  }

  function createBase()
  {
    const baseColor = new THREE.Color("#3F88C5");
    const baseGeometry = new THREE.BoxGeometry(30, 30, 4);
    const baseMaterial = new THREE.MeshPhongMaterial({color:baseColor});
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    return base;
  }

  function createRetanguloTraseiro()
  {
    const retanguloTraseiroColor = new THREE.Color("#D72638");
    const retanguloTraseiroGeometry = new THREE.BoxGeometry(15, 4, 10);
    const retanguloTraseiroMaterial = new THREE.MeshPhongMaterial({color:retanguloTraseiroColor});
    const retanguloTraseiro = new THREE.Mesh(retanguloTraseiroGeometry, retanguloTraseiroMaterial);
    return retanguloTraseiro;
  }

  function createTraseira()
  {
    const traseiraColor = new THREE.Color("#3F88C5");
    const traseiraGeometry = new THREE.BoxGeometry(30, 5, 4);
    const traseiraMaterial = new THREE.MeshPhongMaterial({color:traseiraColor});
    const traseira = new THREE.Mesh(traseiraGeometry, traseiraMaterial);
    return traseira;
  }

  function createBaseAerofolio()
  {
    const baseAerofolioColor = new THREE.Color("#3F88C5");
    const baseAerofolioGeometry = new THREE.BoxGeometry(1, 4, 12);
    const baseAerofolioMaterial = new THREE.MeshPhongMaterial({color:baseAerofolioColor});
    const baseAerofolio = new THREE.Mesh(baseAerofolioGeometry, baseAerofolioMaterial);
    return baseAerofolio;
  }

  function createAerofolio()
  {
    const aerofolioColor = new THREE.Color("#D72638");
    const aerofolioGeometry = new THREE.BoxGeometry(30, 5, 1);
    const aerofolioMaterial = new THREE.MeshPhongMaterial({color:aerofolioColor});
    const aerofolio = new THREE.Mesh(aerofolioGeometry, aerofolioMaterial);
    return aerofolio;
  }

  function createAssento()
  {
    const assentoColor = new THREE.Color("#4169E1");
    const assentoGeometry = new THREE.BoxGeometry(12, 12, 2);
    const assentoMaterial = new THREE.MeshPhongMaterial({color:assentoColor});
    const assento = new THREE.Mesh(assentoGeometry, assentoMaterial);
    return assento;
  }

  function createEncosto()
  {
    const encostoColor = new THREE.Color("#4169E1");
    const encostoGeometry = new THREE.BoxGeometry(12, 1, 12);
    const encostoMaterial = new THREE.MeshPhongMaterial({color:encostoColor});
    const encosto = new THREE.Mesh(encostoGeometry, encostoMaterial);
    return encosto;
  }

  function createPainel()
  {
    const painelColor = new THREE.Color("#4169E1");
    const painelGeometry = new THREE.BoxGeometry(12, 2, 8);
    const painelMaterial = new THREE.MeshPhongMaterial({color:painelColor});
    const painel = new THREE.Mesh(painelGeometry, painelMaterial);
    return painel;
  }

  function createVolante()
  {
    const volanteGeometry = new THREE.TorusGeometry(2, 0.3, 8, 100 );
    const volanteMaterial = new THREE.MeshPhongMaterial( { color: 000000 } );
    const volante = new THREE.Mesh( volanteGeometry, volanteMaterial );
    return volante;
  }

  function changeCamera(position,look,upp) {
    camera.position.copy(position);
    camera.lookAt(look); 
    camera.up.set(upp.x,upp.y,upp.z);
}
  function keyboardUpdate() {

    keyboard.update();

    if ( keyboard.down("left") )   
    {
      if(virado == 0)
      {
        pneu1.rotateX(60);
        pneu2.rotateX(60);
        virado = 1;
        virEsq = 1;
        console.log("Estamos virando pra esquerda");
      }
      if(virado == 1 && virDir == 1)
      {
        pneu1.rotation.x = rotacaoInicial;
        pneu2.rotation.x = rotacaoInicial; 
        virado = 0;
        virDir = 0;
        console.log("Direita esta virada e estamos desvirando");
      }
    }
    if ( keyboard.down("right") )  
    {
      if(virado==0)
      {
        pneu1.rotateX(-60);
        pneu2.rotateX(-60);
        virado = 1;
        virDir = 1;
      }
      if( virado == 1 && virEsq == 1)
      {
        pneu1.rotation.x = rotacaoInicial;
        pneu2.rotation.x = rotacaoInicial; 
        virado = 0;
        virEsq = 0;
        console.log("Esquerda esta virada e estamos desvirando");
      }
    }
    if ( keyboard.pressed("up") )  
    {  
      if(speed != maxspeed)
      {
        speed=speed+0.05;
      }
    }
    if ( keyboard.pressed("down") )
    { 
      if(speed > 0 )
      {
      speed = speed - 0.1;
      }
    }
    if(speed> 0)
    {
      pneu3.rotation.z +=0.1;
      pneu4.rotation.z +=0.1;
      direcao = pneu1.rotation.x;
      retanguloFrontal.rotation.y=Math.cos(direcao) * speed;
      retanguloFrontal.translateZ(speed);
    }
    if( keyboard.pressed("space"))
    {
      changeProjection();
      camera.position.set(0,100,50);
      camera.up.set(0,0,1);
      scene.remove(plane);
    }
  }

  function cameraUpdateLookAt()
  {
    camera.lookAt(retanguloFrontal.position);
    light.lookAt(camera.position);
  }

  function render()
  {
    stats.update(); // Update FPS
    trackballControls.update(); // Enable mouse movements
    lightFollowingCamera(light, camera)
    requestAnimationFrame(render);
    keyboardUpdate();
    cameraUpdateLookAt();
    renderer.render(scene, camera) // Render scene
  }
}