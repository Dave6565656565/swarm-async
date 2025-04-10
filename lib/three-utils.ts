import * as THREE from "three"

// Helper function to create a simple spinning ETH logo
export function createEthereumModel(container: HTMLElement): () => void {
  // Create scene
  const scene = new THREE.Scene()

  // Create camera
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
  camera.position.z = 5

  // Create renderer
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(container.clientWidth, container.clientHeight)
  container.appendChild(renderer.domElement)

  // Create geometry for ETH logo (simplified as a diamond shape)
  const geometry = new THREE.OctahedronGeometry(2, 0)

  // Create material with glowing effect
  const material = new THREE.MeshStandardMaterial({
    color: 0x7c3aed, // Purple color
    metalness: 0.8,
    roughness: 0.2,
    emissive: 0x3a0ca3,
    emissiveIntensity: 0.4,
  })

  // Create mesh
  const ethLogo = new THREE.Mesh(geometry, material)
  scene.add(ethLogo)

  // Add lights
  const pointLight = new THREE.PointLight(0xffffff, 1, 100)
  pointLight.position.set(5, 5, 5)
  scene.add(pointLight)

  const ambientLight = new THREE.AmbientLight(0x404040)
  scene.add(ambientLight)

  // Animation function
  function animate() {
    const animationId = requestAnimationFrame(animate)

    ethLogo.rotation.x += 0.01
    ethLogo.rotation.y += 0.01

    renderer.render(scene, camera)

    return animationId
  }

  // Start animation
  const animationId = animate()

  // Handle window resize
  const handleResize = () => {
    camera.aspect = container.clientWidth / container.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(container.clientWidth, container.clientHeight)
  }

  window.addEventListener("resize", handleResize)

  // Return cleanup function
  return () => {
    window.removeEventListener("resize", handleResize)
    cancelAnimationFrame(animationId)
    container.removeChild(renderer.domElement)
  }
}

// Helper function to create particles effect
export function createParticlesEffect(container: HTMLElement): () => void {
  // Create scene
  const scene = new THREE.Scene()

  // Create camera
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
  camera.position.z = 15

  // Create renderer
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(container.clientWidth, container.clientHeight)
  container.appendChild(renderer.domElement)

  // Create particles
  const particlesGeometry = new THREE.BufferGeometry()
  const particlesCount = 1000

  const posArray = new Float32Array(particlesCount * 3)

  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 20
  }

  particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

  // Create material
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    color: 0x7c3aed,
    transparent: true,
    opacity: 0.8,
  })

  // Create points
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
  scene.add(particlesMesh)

  // Animation function
  function animate() {
    const animationId = requestAnimationFrame(animate)

    particlesMesh.rotation.x += 0.0005
    particlesMesh.rotation.y += 0.0005

    renderer.render(scene, camera)

    return animationId
  }

  // Start animation
  const animationId = animate()

  // Handle window resize
  const handleResize = () => {
    camera.aspect = container.clientWidth / container.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(container.clientWidth, container.clientHeight)
  }

  window.addEventListener("resize", handleResize)

  // Return cleanup function
  return () => {
    window.removeEventListener("resize", handleResize)
    cancelAnimationFrame(animationId)
    container.removeChild(renderer.domElement)
  }
}
