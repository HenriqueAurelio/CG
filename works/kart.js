function main() {
    var stats = initStats();          // To show FPS information
    var scene = new THREE.Scene();    // Create main scene
    var renderer = initRenderer();    // View function in util/utils
    var camera = initCamera(new THREE.Vector3(0, -10, 10)); // Init camera in this position

    // Set angles of rotation
    var angle = 0;
    var speed = 0.05;
    var animationOn = true; // control if animation is on or of
    // Enable mouse rotation, pan, zoom etc.
    var trackballControls = new THREE.TrackballControls(camera, renderer.domElement);

    // Show axes (parameter is size of each axis)
    var axesHelper = new THREE.AxesHelper(12);
    scene.add(axesHelper);

    // create the ground plane
    var planeGeometry = new THREE.PlaneGeometry(20, 20);
    planeGeometry.translate(0.0, 0.0, -0.02); // To avoid conflict with the axeshelper
    var planeMaterial = new THREE.MeshBasicMaterial({
        color: "rgba(150, 150, 150)",
        side: THREE.DoubleSide,
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    // add the plane to the scene
    scene.add(plane);


    //////KART

    //cilindro 1
    var cylinderGeometry1 = new THREE.CylinderGeometry(0.1, 0.1, 2.3, 25);
    var cylinderMaterial1 = new THREE.MeshPhongMaterial({ color: 'rgb(128,128,128)' });
    var cylinder1 = new THREE.Mesh(cylinderGeometry1, cylinderMaterial1);
    cylinder1.position.set(0.0, 0.0, 0.4);
    scene.add(cylinder1);

    //roda 1
    var rodaGeometry1 = new THREE.TorusBufferGeometry(0.25, 0.2, 16, 50);
    var rodaMaterial1 = new THREE.MeshPhongMaterial({ color: 'rgb(5, 5, 5)' });
    roda1 = new THREE.Mesh(rodaGeometry1, rodaMaterial1);
    roda1.rotateX(degreesToRadians(90));
    cylinder1.add(roda1);

    //roda 2
    var rodaGeometry2 = new THREE.TorusBufferGeometry(0.25, 0.2, 16, 50);
    var rodaMaterial2 = new THREE.MeshPhongMaterial({ color: 'rgb(5, 5, 5)' });
    roda2 = new THREE.Mesh(rodaGeometry2, rodaMaterial2);
    roda2.rotateX(degreesToRadians(90));
    cylinder1.add(roda2);

    //cylinder 2
    var cylinderGeometry2 = new THREE.CylinderGeometry(0.1, 0.1, 2.3, 25);
    var cylinderMaterial2 = new THREE.MeshPhongMaterial({ color: 'rgb(128,128,128)' });
    var cylinder2 = new THREE.Mesh(cylinderGeometry2, cylinderMaterial2);
    cylinder2.position.set(0.0, 0.0, 0.5);
    cylinder1.add(cylinder2);

    //roda 3
    var rodaGeometry3 = new THREE.TorusBufferGeometry(0.25, 0.2, 16, 50);
    var rodaMaterial3 = new THREE.MeshPhongMaterial({ color: 'rgb(5, 5, 5)' });
    roda3 = new THREE.Mesh(rodaGeometry3, rodaMaterial3);
    roda3.rotateX(degreesToRadians(90));
    cylinder2.add(roda3);

    //roda 4
    var rodaGeometry4 = new THREE.TorusBufferGeometry(0.25, 0.2, 16, 50);
    var rodaMaterial4 = new THREE.MeshPhongMaterial({ color: 'rgb(5, 5, 5)' });
    roda4 = new THREE.Mesh(rodaGeometry4, rodaMaterial4);
    roda4.rotateX(degreesToRadians(90));
    cylinder2.add(roda4);


    //asa dianteira
    var asaDianteiraGeometry = new THREE.BoxBufferGeometry(0.8, 1.6, 0.15);
    var asaDianteiraMaterial = new THREE.MeshPhongMaterial({ color: '#FFE4B5' });
    asaDianteira = new THREE.Mesh(asaDianteiraGeometry, asaDianteiraMaterial);
    cylinder1.add(asaDianteira);

    //asa dianteira aux - o que liga a asa ao corpo do carro
    var asaAuxGeometry = new THREE.BoxBufferGeometry(1.2, 0.5, 0.4);
    var asaAuxMaterial = new THREE.MeshPhongMaterial({ color: '#FFE4B5' });
    asaAux = new THREE.Mesh(asaAuxGeometry, asaAuxMaterial);
    cylinder1.add(asaAux);

    //asa dianteira aux
    var asaAux2Geometry = new THREE.BoxBufferGeometry(0.8, 1.6, 0.15);
    var asaAux2Material = new THREE.MeshPhongMaterial({ color: '#FF7F24' });
    asaAux2 = new THREE.Mesh(asaAux2Geometry, asaAux2Material);
    cylinder1.add(asaAux2);

    //asa dianteira aux
    var asaAux3Geometry = new THREE.BoxBufferGeometry(0.3, 0.5, 0.15);
    var asaAux3Material = new THREE.MeshPhongMaterial({ color: '#FFE4B5' });
    asaAux3 = new THREE.Mesh(asaAux3Geometry, asaAux3Material);
    cylinder1.add(asaAux3);

    //corpo parte 1
    var corpo1Geometry = new THREE.BoxBufferGeometry(3.0, 2.0, 0.2);
    var corpo1Material = new THREE.MeshPhongMaterial({ color: '#FFE4B5' });
    corpo1 = new THREE.Mesh(corpo1Geometry, corpo1Material);
    cylinder1.add(corpo1);

    //corpo parte 2
    var corpo2Geometry = new THREE.BoxBufferGeometry(1.0, 2.0, 0.4);
    var corpo2Material = new THREE.MeshPhongMaterial({ color: '#FF7F24' });
    corpo2 = new THREE.Mesh(corpo2Geometry, corpo2Material);
    cylinder1.add(corpo2);

    //corpo parte 3
    var corpo3Geometry = new THREE.BoxBufferGeometry(0.5, 2.0, 0.4);
    var corpo3Material = new THREE.MeshPhongMaterial({ color: '#FF7F24' });
    corpo3 = new THREE.Mesh(corpo3Geometry, corpo3Material);
    cylinder1.add(corpo3);

    //corpo parte 4
    var corpo4Geometry = new THREE.BoxBufferGeometry(3.0, 0.3, 0.4);
    var corpo4Material = new THREE.MeshPhongMaterial({ color: '#FF7F24' });
    corpo4 = new THREE.Mesh(corpo4Geometry, corpo4Material);
    cylinder1.add(corpo4);

    //corpo parte 5
    var corpo5Geometry = new THREE.BoxBufferGeometry(3.0, 0.3, 0.4);
    var corpo5Material = new THREE.MeshPhongMaterial({ color: '#FF7F24' });
    corpo5 = new THREE.Mesh(corpo5Geometry, corpo5Material);
    cylinder1.add(corpo5);

    //aerofolio

    //aerofolio - o pedaço que liga a parte do aerofolio ao corpo
    var aerofolioGeometry = new THREE.BoxBufferGeometry(0.8, 0.5, 0.4);
    var aerofolioMaterial = new THREE.MeshPhongMaterial({ color: '#FFE4B5' });
    aerofolio = new THREE.Mesh(aerofolioGeometry, aerofolioMaterial);
    cylinder1.add(aerofolio);

    //aerofolio 
    var aerofolio2Geometry = new THREE.BoxBufferGeometry(0.2, 1.4, 0.4);
    var aerofolio2Material = new THREE.MeshPhongMaterial({ color: '#FFE4B5' });
    aerofolio2 = new THREE.Mesh(aerofolio2Geometry, aerofolio2Material);
    cylinder1.add(aerofolio2);

    //perna do aerofolio
    var aerofolio3Geometry = new THREE.BoxBufferGeometry(0.2, 0.1, 0.6);
    var aerofolio3Material = new THREE.MeshPhongMaterial({ color: '#FF7F24' });
    aerofolio3 = new THREE.Mesh(aerofolio3Geometry, aerofolio3Material);
    cylinder1.add(aerofolio3);

    //perna do aerofolio
    var aerofolio4Geometry = new THREE.BoxBufferGeometry(0.2, 0.1, 0.6);
    var aerofolio4Material = new THREE.MeshPhongMaterial({ color: '#FF7F24' });
    aerofolio4 = new THREE.Mesh(aerofolio4Geometry, aerofolio4Material);
    cylinder1.add(aerofolio4);

    //asa do aerofolio
    var aerofolio5Geometry = new THREE.BoxBufferGeometry(0.3, 1.7, 0.1);
    var aerofolio5Material = new THREE.MeshPhongMaterial({ color: '#FF7F24' });
    aerofolio5 = new THREE.Mesh(aerofolio5Geometry, aerofolio5Material);
    cylinder1.add(aerofolio5);

    //volante
    var volante1Geometry = new THREE.BoxBufferGeometry(0.3, 0.4, 0.3);
    var volante1Material = new THREE.MeshPhongMaterial({ color: '#FFE4B5' });
    volante1 = new THREE.Mesh(volante1Geometry, volante1Material);
    cylinder1.add(volante1);

    //volante
    var volanteGeometry = new THREE.TorusBufferGeometry(0.2, 0.06, 16, 50);
    var volanteMaterial = new THREE.MeshPhongMaterial({ color: '#4F4F4F' });
    volante = new THREE.Mesh(volanteGeometry, volanteMaterial);
    volante1.add(volante);

    //banco
    var banco1Geometry = new THREE.BoxBufferGeometry(1.0, 0.8, 0.2);
    var banco1Material = new THREE.MeshPhongMaterial({ color: '#4F4F4F' });
    banco1 = new THREE.Mesh(banco1Geometry, banco1Material);
    cylinder1.add(banco1);

    //banco
    var banco2Geometry = new THREE.BoxBufferGeometry(0.15, 0.8, 0.6);
    var banco2Material = new THREE.MeshPhongMaterial({ color: '#4F4F4F' });
    banco2 = new THREE.Mesh(banco2Geometry, banco2Material);
    cylinder1.add(banco2);



    ////////



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
    window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);
    render();

    function rotateKart() {
        // More info:
        // https://threejs.org/docs/#manual/en/introduction/Matrix-transformations
        cylinder1.matrixAutoUpdate = false;
        cylinder2.matrixAutoUpdate = false;
        roda1.matrixAutoUpdate = false;
        roda2.matrixAutoUpdate = false;
        roda3.matrixAutoUpdate = false;
        roda4.matrixAutoUpdate = false;
        asaDianteira.matrixAutoUpdate = false;
        asaAux.matrixAutoUpdate = false;
        asaAux2.matrixAutoUpdate = false;
        asaAux3.matrixAutoUpdate = false;
        corpo1.matrixAutoUpdate = false;
        corpo2.matrixAutoUpdate = false;
        corpo3.matrixAutoUpdate = false;
        corpo4.matrixAutoUpdate = false;
        corpo5.matrixAutoUpdate = false;
        aerofolio.matrixAutoUpdate = false;
        aerofolio2.matrixAutoUpdate = false;
        aerofolio3.matrixAutoUpdate = false;
        aerofolio4.matrixAutoUpdate = false;
        aerofolio5.matrixAutoUpdate = false;
        volante1.matrixAutoUpdate = false;
        volante.matrixAutoUpdate = false;
        banco1.matrixAutoUpdate = false;
        banco2.matrixAutoUpdate = false;

        // Set angle's animation speed
        if (animationOn) {
            angle += speed;

            var mat4 = new THREE.Matrix4();
            cylinder1.matrix.identity();
            cylinder2.matrix.identity();
            roda1.matrix.identity();
            roda2.matrix.identity();
            roda3.matrix.identity();
            roda4.matrix.identity();
            asaDianteira.matrix.identity();
            asaAux.matrix.identity();
            asaAux2.matrix.identity();
            asaAux3.matrix.identity();
            corpo1.matrix.identity();
            corpo2.matrix.identity();
            corpo3.matrix.identity();
            corpo4.matrix.identity();
            corpo5.matrix.identity();
            aerofolio.matrix.identity();
            aerofolio2.matrix.identity();
            aerofolio3.matrix.identity();
            aerofolio4.matrix.identity();
            aerofolio5.matrix.identity();
            volante1.matrix.identity();
            volante.matrix.identity();
            banco1.matrix.identity();
            banco2.matrix.identity();


            //cylinder1
            cylinder1.matrix.multiply(mat4.makeRotationZ(0));
            cylinder1.matrix.multiply(mat4.makeTranslation(0.0, 0.0, 0.4));

            //roda1
            roda1.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));
            roda1.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
            //roda2
            roda2.matrix.multiply(mat4.makeTranslation(0.0, -1.0, 0.0));
            roda2.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));

            //cylinder2
            cylinder2.matrix.multiply(mat4.makeRotationZ(0));
            cylinder2.matrix.multiply(mat4.makeTranslation(4.0, 0.0, 0.0));

            //roda3
            roda3.matrix.multiply(mat4.makeTranslation(0.0, 1.0, 0.0));
            roda3.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
            //roda4
            roda4.matrix.multiply(mat4.makeTranslation(0.0, -1.0, 0.0));
            roda4.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));

            //asa dianteira
            asaDianteira.matrix.multiply(mat4.makeTranslation(-1.0, 0.0, 0.0));
            asaAux.matrix.multiply(mat4.makeTranslation(0.0, 0.0, 0.2));
            asaAux2.matrix.multiply(mat4.makeTranslation(-1.0, 0.0, 0.15));
            asaAux3.matrix.multiply(mat4.makeTranslation(-0.75, 0.0, 0.3));

            //corpo
            corpo1.matrix.multiply(mat4.makeTranslation(2.0, 0.0, 0.0));
            corpo2.matrix.multiply(mat4.makeTranslation(1.0, 0.0, 0.3));
            corpo3.matrix.multiply(mat4.makeTranslation(3.25, 0.0, 0.3));
            corpo4.matrix.multiply(mat4.makeTranslation(2.0, 0.85, 0.3));
            corpo5.matrix.multiply(mat4.makeTranslation(2.0, -0.85, 0.3));

            //aerofolio
            aerofolio.matrix.multiply(mat4.makeTranslation(3.8, 0.0, 0.0));
            aerofolio2.matrix.multiply(mat4.makeTranslation(4.3, 0.0, 0.0));
            aerofolio3.matrix.multiply(mat4.makeTranslation(4.3, 0.3, 0.5));
            aerofolio4.matrix.multiply(mat4.makeTranslation(4.3, -0.3, 0.5));
            aerofolio5.matrix.multiply(mat4.makeTranslation(4.3, 0.0, 0.8));

            //volante
            volante1.matrix.multiply(mat4.makeTranslation(1.4, 0.0, 0.6));
            volante.matrix.multiply(mat4.makeTranslation(0.2, 0.0, 0.06));
            volante.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
            volante.matrix.multiply(mat4.makeRotationY(degreesToRadians(90)));

            //banco
            banco1.matrix.multiply(mat4.makeTranslation(2.5, 0.0, 0.2));
            banco2.matrix.multiply(mat4.makeTranslation(2.9, 0.0, 0.6));

        }
    }


    function render() {
        stats.update(); // Update FPS
        trackballControls.update(); // Enable mouse movements
        rotateKart();
        requestAnimationFrame(render);
        renderer.render(scene, camera) // Render scene
    }
}
