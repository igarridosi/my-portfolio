import React from 'react'

function Skills() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold mb-6">Skills</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border-2 border-gray-200 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Frontend</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>React</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
          </ul>
        </div>
        <div className="p-4 border-2 border-gray-200 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Backend</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Node.js</li>
            <li>Python</li>
            <li>SQL</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Skills
