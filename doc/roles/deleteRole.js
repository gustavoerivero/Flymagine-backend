module.exports = {
  delete: {
    tags: ['Role'],
    summary: 'Delete a role by id',
    description: 'Delete a role by id',
    operationId: 'deleteRole',
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
        description: 'Role deleted',
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