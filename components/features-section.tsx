"use client"

import { motion } from "framer-motion"
import { Shield, Zap, BarChart3, Coins } from "lucide-react"
import { useEffect, useRef } from "react"
import * as THREE from "three"

export function FeaturesSection() {
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sceneRef.current) return

    // Create scene
    const scene = new THREE.Scene()

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sceneRef.current.clientWidth / sceneRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 5

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(sceneRef.current.clientWidth, sceneRef.current.clientHeight)
    sceneRef.current.appendChild(renderer.domElement)

    // Create geometry for floating cubes
    const cubes: THREE.Mesh[] = []
    const cubeCount = 20

    for (let i = 0; i < cubeCount; i++) {
      const size = Math.random() * 0.5 + 0.1
      const geometry = new THREE.BoxGeometry(size, size, size)

      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0.9, 0.9, 0.9),
        metalness: 0.8,
        roughness: 0.2,
        emissive: new THREE.Color(0.1, 0.1, 0.1),
        emissiveIntensity: 0.5,
      })

      const cube = new THREE.Mesh(geometry, material)

      // Position cubes randomly in a sphere
      const radius = 4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI

      cube.position.x = radius * Math.sin(phi) * Math.cos(theta)
      cube.position.y = radius * Math.sin(phi) * Math.sin(theta)
      cube.position.z = radius * Math.cos(phi)

      // Random rotation
      cube.rotation.x = Math.random() * Math.PI
      cube.rotation.y = Math.random() * Math.PI
      cube.rotation.z = Math.random() * Math.PI

      scene.add(cube)
      cubes.push(cube)
    }

    // Add lights
    const pointLight = new THREE.PointLight(0xffffff, 1, 100)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    const ambientLight = new THREE.AmbientLight(0x404040)
    scene.add(ambientLight)

    // Animation function
    function animate() {
      const animationId = requestAnimationFrame(animate)

      // Rotate cubes
      cubes.forEach((cube, index) => {
        cube.rotation.x += 0.005 + index * 0.0001
        cube.rotation.y += 0.01 + index * 0.0001
      })

      renderer.render(scene, camera)

      return animationId
    }

    // Start animation
    const animationId = animate()

    // Handle window resize
    const handleResize = () => {
      if (!sceneRef.current) return
      camera.aspect = sceneRef.current.clientWidth / sceneRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(sceneRef.current.clientWidth, sceneRef.current.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    // Return cleanup function
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      if (sceneRef.current) {
        sceneRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  const features = [
    {
      icon: <Shield className="h-8 w-8 text-black" />,
      title: "Secure Staking",
      description: "Your assets are secured by industry-leading security protocols and smart contract audits.",
    },
    {
      icon: <Zap className="h-8 w-8 text-black" />,
      title: "High APY",
      description: "Earn up to 15% APY on your staked ETH, significantly higher than traditional finance.",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-black" />,
      title: "Real-time Analytics",
      description: "Track your rewards and performance with our advanced real-time analytics dashboard.",
    },
    {
      icon: <Coins className="h-8 w-8 text-black" />,
      title: "Flexible Terms",
      description: "Choose from various staking periods to match your investment strategy and goals.",
    },
  ]

  return (
    <section className="w-full py-24 md:py-32 bg-[#f5f5f7] relative overflow-hidden" id="features">
      <div className="max-w-[1024px] mx-auto px-6 md:px-8">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-semibold tracking-tight mb-4"
          >
            Why Stake With Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Experience the future of Ethereum staking with our platform
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative z-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-sm"
            >
              <div className="mb-6 p-4 rounded-full bg-[#f5f5f7] inline-block">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 h-[400px] relative">
          <div ref={sceneRef} className="absolute inset-0" />
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="text-center max-w-2xl p-8 bg-white/80 backdrop-blur-md rounded-3xl"
            >
              <h3 className="text-3xl font-semibold mb-4">Experience the Future of Staking</h3>
              <p className="text-gray-600">
                Our platform combines cutting-edge technology with user-friendly interfaces to provide the best staking
                experience in the crypto space.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
