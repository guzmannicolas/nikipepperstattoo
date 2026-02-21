const tattoo2 = new Proxy({"src":"/_astro/pink-flower-forearm-tattoo-wrist-design.VUCKH1fV.jpg","width":1920,"height":2560,"format":"jpg","orientation":1}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/xampp/htdocs/nikipepperstattoo/src/assets/tattoos/botanical/pink-flower-forearm-tattoo-wrist-design.jpg";
							}
							
							return target[name];
						}
					});

export { tattoo2 as t };
