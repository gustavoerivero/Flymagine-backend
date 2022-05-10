module.exports = {
  get: {
    tags: ['Role'],
    summary: 'Get all roles',
    description: 'Get all roles',
    operationId: 'getRole',
    responses: {
      '200': {
        Ok: '1',
        description: 'Role found',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/schemas/Role',
              },
            },
          },
        },
        schema: {
          $ref: '#/schemas/Role',
        },  
      },      
      '404': {
        Ok: '0',
        description: 'Error',
      },
      '500': {
        description: 'Internal server error',
      },
    },
  },
}