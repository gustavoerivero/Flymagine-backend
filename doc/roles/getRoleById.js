module.exports = {
  get: {
    tags: ['Role'],
    summary: 'Get a role by id',
    description: 'Get a role by id',
    operationId: 'getRoleById',
    parameters: [
      {
        in: 'path',
        name: 'id',
        description: 'Role id',
        required: true,
        schema: {
          type: 'string',
        },
      },
    ],
    responses: {
      '200': {
        Ok: '1',
        description: 'Role found',
        schema: {
          $ref: '#/schemas/Role',
        },
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