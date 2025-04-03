import React from 'react'

function Projects() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold mb-6">Projects</h2>
      <div className="grid gap-6">
        <div className="border-2 border-gray-200 p-6 rounded-lg">
          <h3 className="text-2xl font-bold mb-2">Proyecto 1</h3>
          <p className="text-gray-700">Descripción del proyecto...</p>
        </div>
        <div className="border-2 border-gray-200 p-6 rounded-lg">
          <h3 className="text-2xl font-bold mb-2">Proyecto 2</h3>
          <p className="text-gray-700">Descripción del proyecto...</p>
        </div>
      </div>
    </div>
  )
}

export default Projects
