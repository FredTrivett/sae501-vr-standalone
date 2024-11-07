export const mockProjects = Array.from({ length: 30 }, (_, i) => ({
    id: `project-${i + 1}`,
    name: `VR Experience ${i + 1}`,
    type: ['VR Experience', 'Interactive Game', 'Virtual Tour'][Math.floor(Math.random() * 3)],
    createdAt: new Date(2024, 0, i + 1).toISOString(),
})); 