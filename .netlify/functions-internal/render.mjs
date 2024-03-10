import { init } from '../serverless.js';

export const handler = init({
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		entry: {"file":"_app/immutable/start-3ca7f57d.js","imports":["_app/immutable/start-3ca7f57d.js","_app/immutable/chunks/index-7696a96e.js","_app/immutable/chunks/singletons-cbc4f811.js","_app/immutable/chunks/index-09f2b42b.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('../server/nodes/0.js'),
			() => import('../server/nodes/1.js'),
			() => import('../server/nodes/2.js'),
			() => import('../server/nodes/3.js'),
			() => import('../server/nodes/4.js'),
			() => import('../server/nodes/5.js'),
			() => import('../server/nodes/6.js'),
			() => import('../server/nodes/7.js'),
			() => import('../server/nodes/8.js'),
			() => import('../server/nodes/9.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				names: [],
				types: [],
				optional: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/irlmlb24/mlbingo",
				pattern: /^\/irlmlb24\/mlbingo\/?$/,
				names: [],
				types: [],
				optional: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			},
			{
				id: "/nhl24",
				pattern: /^\/nhl24\/?$/,
				names: [],
				types: [],
				optional: [],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			},
			{
				id: "/nhl24/clubs/[platform]/[clubId]",
				pattern: /^\/nhl24\/clubs\/([^/]+?)\/([^/]+?)\/?$/,
				names: ["platform","clubId"],
				types: [null,null],
				optional: [false,false],
				page: { layouts: [0], errors: [1], leaf: 5 },
				endpoint: null
			},
			{
				id: "/nhl24/favorites",
				pattern: /^\/nhl24\/favorites\/?$/,
				names: [],
				types: [],
				optional: [],
				page: { layouts: [0], errors: [1], leaf: 6 },
				endpoint: null
			},
			{
				id: "/nhl24/player-stats/[platform]/[playerId]",
				pattern: /^\/nhl24\/player-stats\/([^/]+?)\/([^/]+?)\/?$/,
				names: ["platform","playerId"],
				types: [null,null],
				optional: [false,false],
				page: { layouts: [0], errors: [1], leaf: 7 },
				endpoint: null
			},
			{
				id: "/nhl24/search",
				pattern: /^\/nhl24\/search\/?$/,
				names: [],
				types: [],
				optional: [],
				page: { layouts: [0], errors: [1], leaf: 8 },
				endpoint: null
			},
			{
				id: "/nhl24/search/[platform]/[clubId]",
				pattern: /^\/nhl24\/search\/([^/]+?)\/([^/]+?)\/?$/,
				names: ["platform","clubId"],
				types: [null,null],
				optional: [false,false],
				page: { layouts: [0], errors: [1], leaf: 9 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
});
