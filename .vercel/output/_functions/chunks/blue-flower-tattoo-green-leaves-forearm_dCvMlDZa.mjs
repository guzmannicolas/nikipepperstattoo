const koiFish = new Proxy({"src":"/_astro/koi-fish-tattoo-lily-pads-water-lilies.CUXQxztO.jpeg","width":1440,"height":1439,"format":"jpg","orientation":1}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/xampp/htdocs/nikipepperstattoo/src/assets/tattoos/animals/koi-fish-tattoo-lily-pads-water-lilies.jpeg";
							}
							
							return target[name];
						}
					});

const tattoo3 = new Proxy({"src":"/_astro/red-poppies-blue-cornflowers-arm-tattoo.CA8csctp.jpeg","width":1707,"height":2560,"format":"jpg","orientation":1}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/xampp/htdocs/nikipepperstattoo/src/assets/tattoos/botanical/red-poppies-blue-cornflowers-arm-tattoo.jpeg";
							}
							
							return target[name];
						}
					});

const tattoo1 = new Proxy({"src":"/_astro/blue-flower-tattoo-green-leaves-forearm.BQdb1Pt4.jpg","width":1920,"height":2560,"format":"jpg","orientation":1}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/xampp/htdocs/nikipepperstattoo/src/assets/tattoos/botanical/blue-flower-tattoo-green-leaves-forearm.jpg";
							}
							
							return target[name];
						}
					});

export { tattoo3 as a, koiFish as k, tattoo1 as t };
