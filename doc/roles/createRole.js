module.exports = {
  post: {
    tags: ['Role'],
    summary: 'Create a new role',
    description: 'Create a new role',
    operationId: 'createRole',
    requestBody: {
      description: 'Role to create',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/Role',
          },
        },
      },
      required: true,
    },
    responses: {
      '200': {
        description: 'Role successfully created',
        schema: {
          $ref: '#/schemas/Role',
        },
      },
      '400': {
        description: 'Invalid role object',
      },
      '500': {
        description: 'Internal server error',
      },
    },
  },
}