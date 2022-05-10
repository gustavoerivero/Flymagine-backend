module.exports = {
  put: {
    tags: ['Role'],
    summary: 'Update a role by id',
    description: 'Update a role by id',
    operationId: 'putRole',
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
    requestBody: {
      description: 'Role to update',
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
        description: 'Role updated',
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