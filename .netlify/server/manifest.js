export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		entry: {"file":"_app/immutable/start-3726a49b.js","imports":["_app/immutable/start-3726a49b.js","_app/immutable/chunks/index-8565d05b.js","_app/immutable/chunks/singletons-5c91e0ad.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js')
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
				id: "/nhl23/player-stats/[platform]/[playerId]",
				pattern: /^\/nhl23\/player-stats\/([^/]+?)\/([^/]+?)\/?$/,
				names: ["platform","playerId"],
				types: [null,null],
				optional: [false,false],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
