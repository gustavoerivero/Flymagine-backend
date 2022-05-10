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
        Ok: '1',
        description: 'Role created',
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