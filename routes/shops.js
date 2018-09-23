// routes/shops.js
const GROUP_NAME = 'shops';

const Joi = require('Joi');

// 引入 models
const { paginationDefine,jwtHeaderDefine } = require('../utils/router-helper');
const models = require('../models');

module.exports = [
  {
    method: 'GET',
    path: `/${GROUP_NAME}`,
    handler: async (request, reply) => {
      // console.log(request.query)
      const { rows: results, count: totalCount } = await models.shops.findAndCountAll({
        attributes: [
          'id',
          'name',
        ],
        limit: request.query.limit,
        offset: (request.query.page - 1) * request.query.limit,
      });
      // console.log(results)
      // 开启分页的插件，返回的数据结构里，需要带上 result 与 totalCount 两个字段
      reply({ results, totalCount });
    },
    config: {
      tags: ['api', GROUP_NAME],
      auth: false,
      description: '获取店铺列表',
      validate: {
        query: {
          ...paginationDefine
        },
        ...jwtHeaderDefine
      }
    }
  },
  // {
  //   method: 'GET',
  //   path: `/${GROUP_NAME}`,
  //   handler: async (request, reply) => {
  //     reply("get");
  //   },
  //   config: {
  //     tags: ['api', GROUP_NAME],
  //     description: '获取店铺列表',
  //   },
  // },
  {
    method: 'GET',
    path: `/${GROUP_NAME}/{shopId}/goods`,
    handler: async (request, reply) => {
      // 增加带有 where 的条件查询
      const { rows: results, count: totalCount } = await models.goods.findAndCountAll({
        // 基于 shop_id 的条件查询
        where: {
          shop_id: request.params.shopId,
        },
        attributes: [
          'id',
          'name',
        ],
        limit: request.query.limit,
        offset: (request.query.page - 1) * request.query.limit,
      });
      // 开启分页的插件，返回的数据结构里，需要带上result与totalCount两个字段
      reply({ results, totalCount });
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '获取店铺的商品列表',
      validate: {
        params: {
          shopId: Joi.string().required().description('店铺的id'),
        },
        query: {
          ...paginationDefine,
        },
      },
    },
  },
];


