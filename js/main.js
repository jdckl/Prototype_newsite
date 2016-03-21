$(document).ready(function() {
var vertexHeight = 15;
var planeDefinition = 50;
var planeSize = 25000;

var container = document.getElementById('head_threejs');
var fog = new THREE.Fog(0x000000, 1000, 10000);
var camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight,1, 20000)

camera.position.z = 3500;

var scene = new THREE.Scene();

var geometry = new THREE.PlaneGeometry(planeSize, planeSize, planeDefinition, planeDefinition);
geometry.dynamic = true;
  geometry.computeFaceNormals();
  geometry.computeVertexNormals();
  geometry.normalsNeedUpdate = true;

var material = new THREE.MeshPhongMaterial({color: 0xffffff, specular: 0xffffff, shininess: 0, shading: THREE.FlatShading});

var	plane = new THREE.Mesh(geometry, material);
plane.rotation.x -=1;

scene.add( plane );
scene.fog = fog;

  var ambientLight = new THREE.AmbientLight(0x1a1a1a);
  scene.add( ambientLight );

  var dirLight = new THREE.DirectionalLight(0xdfe8ef, 0.10);
  dirLight.position.set(3, 5, 1);
  scene.add( dirLight );


var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild( renderer.domElement );

updatePlane();

 function updatePlane() {
   for (var i = 0; i < plane.geometry.vertices.length; i++)
   {
     plane.geometry.vertices[i].z += Math.random()*vertexHeight -vertexHeight;
   }
 };

 updateVerts();

 function updateVerts() {
   for (var i = 0; i < plane.geometry.vertices.length; i++)
   {
     plane.geometry.vertices[i].z += Math.random()*vertexHeight -(vertexHeight/2);
   }
   plane.geometry.verticesNeedUpdate = true;
 };

render();

			function render() {
        requestAnimationFrame( render );
        updateVerts();
        renderer.render( scene, camera );
			}


      window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}
});
