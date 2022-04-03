module.exports = {
  schemas: {
    Role: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The name of the role',
          required: true,
          description: 'Role name',
          example: 'Reader',
        },
        status: {
          type: 'string',
          description: 'The status of the role',
          required: true,
          example: 'A'
        }
      },
    },
  }
}