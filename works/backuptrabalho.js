function main()
{
  var stats = initStats();          // To show FPS information
  var scene = new THREE.Scene();    // Create main scene
  var renderer = initRenderer();    // View function in util/utils
  var camera = initCamera(new THREE.Vector3(0, -30, 15)); // Init camera in this position

  // Enable mouse rotation, pan, zoom etc.
  var trackballControls = new THREE.TrackballControls( camera, renderer.domElement );

  // Show axes (parameter is size of each axis)
  var axesHelper = new THREE.AxesHelper( 12 );
  scene.add( axesHelper );

  // create the ground plane
  var planeGeometry = new THREE.PlaneGeometry(200, 200);
  planeGeometry.translate(0.0, 0.0, -0.02); // To avoid conflict with the axeshelper
  var planeMaterial = new THREE.MeshBasicMaterial({
      color: "rgba(150, 150, 150)",
      side: THREE.DoubleSide,
  });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  // add the plane to the scene
  scene.add(plane);

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

  //Posicionando o retângulo traseiro e conectando o eixo ao retângulo traseiro
  retanguloTraseiro.position.set(20.0, 40.0, 5.0);
  retanguloTraseiro.rotateX(Math.PI/2);
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
    controls.add("Use mouse to interact:");
    controls.add("* Left button to rotate");
    controls.add("* Right button to translate (pan)");
    controls.add("* Scroll to zoom in/out.");
    controls.show();

  // Listen window size changes
  window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

  render();

  function createPneu()
  {
    const pneuGeometry = new THREE.TorusGeometry(2.5,2.5, 10, 100 );
    const pneuMaterial = new THREE.MeshNormalMaterial( { color: 000000 } );
    const pneu = new THREE.Mesh( pneuGeometry, pneuMaterial );
    return pneu;
  }

  function createEixo()
  {
    const eixoColor = new THREE.Color("rgb(128, 128, 128)");
    const eixoGeometry = new THREE.CylinderGeometry(1, 1, 40);
    const eixoMaterial = new THREE.MeshNormalMaterial({color:'rgb(180,180,255)'});
    const eixo = new THREE.Mesh(eixoGeometry, eixoMaterial);
    return eixo;
  }

  function createRetanguloFrontal()
  {
    const retanguloFrontalColor = new THREE.Color("rgb(65,105,225)");
    const retanguloFrontalGeometry = new THREE.BoxGeometry(15, 4, 20);
    const retanguloFrontalMaterial = new THREE.MeshNormalMaterial({color:'rgb(180,180,255)'});
    const retanguloFrontal = new THREE.Mesh(retanguloFrontalGeometry, retanguloFrontalMaterial);
    return retanguloFrontal;
  }

  function createBico()
  {
    const bicoColor = new THREE.Color("rgb(65,187,20)");
    const bicoGeometry = new THREE.BoxGeometry(30, 12, 4);
    const bicoMaterial = new THREE.MeshNormalMaterial({color:'rgb(180,180,255)'});
    const bico = new THREE.Mesh(bicoGeometry, bicoMaterial);
    return bico;
  }

  function createBase()
  {
    const baseColor = new THREE.Color("rgb(6,87,20)");
    const baseGeometry = new THREE.BoxGeometry(30, 30, 4);
    const baseMaterial = new THREE.MeshNormalMaterial({color:'rgb(180,180,255)'});
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    return base;
  }

  function createRetanguloTraseiro()
  {
    const retanguloTraseiroColor = new THREE.Color("rgb(6,105,225)");
    const retanguloTraseiroGeometry = new THREE.BoxGeometry(15, 4, 10);
    const retanguloTraseiroMaterial = new THREE.MeshNormalMaterial({color:'rgb(180,180,255)'});
    const retanguloTraseiro = new THREE.Mesh(retanguloTraseiroGeometry, retanguloTraseiroMaterial);
    return retanguloTraseiro;
  }

  function createTraseira()
  {
    const traseiraColor = new THREE.Color("rgb(65,187,20)");
    const traseiraGeometry = new THREE.BoxGeometry(30, 5, 4);
    const traseiraMaterial = new THREE.MeshNormalMaterial({color:'rgb(180,180,255)'});
    const traseira = new THREE.Mesh(traseiraGeometry, traseiraMaterial);
    return traseira;
  }

  function createBaseAerofolio()
  {
    const baseAerofolioColor = new THREE.Color("rgb(65,187,20)");
    const baseAerofolioGeometry = new THREE.BoxGeometry(1, 4, 12);
    const baseAerofolioMaterial = new THREE.MeshNormalMaterial({color:'rgb(180,180,255)'});
    const baseAerofolio = new THREE.Mesh(baseAerofolioGeometry, baseAerofolioMaterial);
    return baseAerofolio;
  }

  function createAerofolio()
  {
    const aerofolioColor = new THREE.Color("rgb(58,32,20)");
    const aerofolioGeometry = new THREE.BoxGeometry(30, 5, 1);
    const aerofolioMaterial = new THREE.MeshNormalMaterial({color:'rgb(180,180,255)'});
    const aerofolio = new THREE.Mesh(aerofolioGeometry, aerofolioMaterial);
    return aerofolio;
  }

  function createAssento()
  {
    const assentoColor = new THREE.Color("rgb(58,32,20)");
    const assentoGeometry = new THREE.BoxGeometry(12, 12, 2);
    const assentoMaterial = new THREE.MeshNormalMaterial({color:'rgb(180,180,255)'});
    const assento = new THREE.Mesh(assentoGeometry, assentoMaterial);
    return assento;
  }

  function createEncosto()
  {
    const encostoColor = new THREE.Color("rgb(58,32,20)");
    const encostoGeometry = new THREE.BoxGeometry(12, 1, 12);
    const encostoMaterial = new THREE.MeshNormalMaterial({color:'rgb(180,180,255)'});
    const encosto = new THREE.Mesh(encostoGeometry, encostoMaterial);
    return encosto;
  }

  function createPainel()
  {
    const painelColor = new THREE.Color("rgb(58,32,20)");
    const painelGeometry = new THREE.BoxGeometry(12, 2, 8);
    const painelMaterial = new THREE.MeshNormalMaterial({color:'rgb(180,180,255)'});
    const painel = new THREE.Mesh(painelGeometry, painelMaterial);
    return painel;
  }

  function createVolante()
  {
    const volanteGeometry = new THREE.TorusGeometry(2, 0.3, 8, 100 );
    const volanteMaterial = new THREE.MeshNormalMaterial( { color: 000000 } );
    const volante = new THREE.Mesh( volanteGeometry, volanteMaterial );
    return volante;
  }

  function render()
  {
    stats.update(); // Update FPS
    trackballControls.update(); // Enable mouse movements
    requestAnimationFrame(render);
    renderer.render(scene, camera) // Render scene
  }
}