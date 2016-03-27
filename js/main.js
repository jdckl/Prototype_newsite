$(document).ready(function() {
var init = function() {

    var width = 100,
        height = 100;

    var scene = new THREE.Scene();

    scene.fog = new THREE.Fog(0x3d315b, 0, 20);
        var container = document.getElementById('head_threejs');

    var geometry = new THREE.PlaneGeometry(1, 1, width - 1, height - 1),
        simplexNoise = new SimplexNoise(),
        octaves = 2,
        persistence = 2,
        frequency,
        amplitude,
        totalAmplitude,
        noise;
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            noise = 0;
            frequency = 8;
            amplitude = 0.125;
            totalAmplitude = 1;
            for (var i = 0; i < octaves; i++) {
                noise += (simplexNoise.noise2D(x / frequency, y / frequency) / 2 + 0.5) * amplitude;
                totalAmplitude += amplitude;
                amplitude *= persistence;
                frequency *= (i === 0) ? 3 : 2;
            }
            noise /= totalAmplitude;
            geometry.vertices[x + y * width].z += (noise - 0.5) * 2;
        }
    }

    geometry.dynamic = true;
    geometry.verticesNeedUpdate = true
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    geometry.normalsNeedUpdate = true;

    var colors = [0x28afb0, 0x55d6be];
  	function getColors() {
     return colors[Math.floor(Math.random() * colors.length)];
  	}

    var material	= new THREE.MeshBasicMaterial({
  		wireframe: false,
      color: getColors()
  	});

    var mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(2, 2, 0.3)
    mesh.scale.multiplyScalar(10);

    var camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.rotation.x = 75 * Math.PI / 180;
    camera.position.set(0, -10, 0.1);
    camera.position.z = -0.8;

    scene.add(mesh);
    scene.add(camera);

    var renderer = new THREE.WebGLRenderer({
        antialiase: true
    });
    renderer.setClearColor(scene.fog.color, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
  	container.appendChild( renderer.domElement );

    var z = 0.0;
    var render = function() {

        mesh.rotation.z -= .01 * Math.PI / 180;

        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                noise = 0;
                frequency = 10;
                amplitude = 0.07;
                totalAmplitude = 1;
                for (var i = 0; i < octaves; i++) {
                    noise += (simplexNoise.noise3D(x / frequency, y / frequency, z) / 2 + 0.5) * amplitude;
                    totalAmplitude += amplitude;
                    amplitude *= persistence;
                    frequency *= (i === 0) ? 3 : 2;
                }
                noise /= totalAmplitude;
                geometry.vertices[x + y * width].z = (noise - 0.5) * 2;
            }
        } //*/
        geometry.verticesNeedUpdate = true;
        z += 0.005;

        renderer.render(scene, camera);

    };

    var animate = function() {

        requestAnimationFrame(animate);
        render();
    };

    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        $('.first').height($(window).height());
    }

    animate();

}();
});
