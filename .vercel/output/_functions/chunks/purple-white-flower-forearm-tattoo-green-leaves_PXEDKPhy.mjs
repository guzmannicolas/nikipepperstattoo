const items = [{"id":1,"slug":"koi-fish-with-water-lilies","title":{"en":"Koi Fish with Water Lilies","es":"Pez Koi con Nenúfares"},"description":"","price":"","images":[{"filename":"Koi Fish with Water Lilies","path":"/images/tattoos/koi-fish-tattoo-lily-pads-water-lilies.jpeg","alt":"Koi Fish with Water Lilies"}],"category":"animals, colour","category_es":"animales, color"},{"id":2,"slug":"pink-lotus-with-leaves","title":{"en":"Pink Lotus with Leaves","es":"Loto Rosa con Hojas"},"description":"","price":"","images":[{"filename":"Pink Lotus with Leaves","path":"/images/tattoos/forearm-pink-lotus-tattoo-leaves.jpg","alt":"Pink Lotus with Leaves"}],"category":"botanical, colour","category_es":"botánico, color"},{"id":3,"slug":"pink-flower-with-green-leaves","title":{"en":"Pink Flower with Green Leaves","es":"Flor Rosa con Hojas Verdes"},"description":"","price":"","images":[{"filename":"Pink Flower with Green Leaves","path":"/images/tattoos/pink-flower-tattoo-green-leaves-petals.jpg","alt":"Pink Flower with Green Leaves"}],"category":"botanical, colour, fineline","category_es":"botánico, color, línea fina"},{"id":4,"slug":"red-poppies-with-cornflowers","title":{"en":"Red Poppies with Blue Cornflowers","es":"Amapolas Rojas con Acianos Azules"},"description":"","price":"","images":[{"filename":"Red Poppies with Blue Cornflowers","path":"/images/tattoos/red-poppies-blue-cornflowers-arm-tattoo.jpeg","alt":"Red Poppies with Blue Cornflowers"}],"category":"botanical, colour","category_es":"botánico, color"},{"id":5,"slug":"bird-with-orange-grey-feathers","title":{"en":"Bird with Orange and Grey Feathers","es":"Pájaro con Plumas Naranjas y Grises"},"description":"","price":"","images":[{"filename":"Bird with Orange and Grey Feathers","path":"/images/tattoos/bird-tattoo-orange-grey-feathers-flowers.jpg","alt":"Bird with Orange and Grey Feathers"}],"category":"animals, colour","category_es":"animales, color"},{"id":6,"slug":"pink-flower-forearm","title":{"en":"Pink Flower Forearm","es":"Flor Rosa en Antebrazo"},"description":"","price":"","images":[{"filename":"Pink Flower Forearm","path":"/images/tattoos/pink-flower-forearm-tattoo-wrist-design.jpg","alt":"Pink Flower Forearm"}],"category":"botanical, colour, fineline","category_es":"botánico, color, línea fina"},{"id":7,"slug":"red-poppy-close","title":{"en":"Red Poppy Close-up","es":"Primer Plano de Amapola Roja"},"description":"","price":"","images":[{"filename":"Red Poppy Close-up","path":"/images/tattoos/red-poppy-tattoo-chest-closeup.jpeg","alt":"Red Poppy Close-up"}],"category":"botanical, colour, fineline","category_es":"botánico, color, línea fina"},{"id":8,"slug":"bird-forearm-orange-grey","title":{"en":"Bird with Orange and Grey Feathers Forearm","es":"Pájaro con Plumas Naranjas y Grises en Antebrazo"},"description":"","price":"","images":[{"filename":"Bird Forearm","path":"/images/tattoos/bird-tattoo-forearm-orange-grey-feathers.jpg","alt":"Bird Forearm"}],"category":"animals, colour","category_es":"animales, color"},{"id":9,"slug":"blue-green-succulent","title":{"en":"Blue-Green Succulent with Pink and Yellow Flowers","es":"Suculenta Azul-Verde con Flores Rosas y Amarillas"},"description":"","price":"","images":[{"filename":"Blue-Green Succulent","path":"/images/tattoos/blue-green-succulent-pink-yellow-flowers-tattoo.jpeg","alt":"Blue-Green Succulent"}],"category":"botanical, colour","category_es":"botánico, color"},{"id":10,"slug":"purple-white-forearm","title":{"en":"Purple and White Flower with Green Leaves Forearm","es":"Flor Violeta y Blanca con Hojas Verdes en Antebrazo"},"description":"","price":"","images":[{"filename":"Purple and White Flower Forearm","path":"/images/tattoos/purple-white-flower-forearm-tattoo-green-leaves.jpg","alt":"Purple and White Flower Forearm"}],"category":"botanical, colour","category_es":"botánico, color"},{"id":11,"slug":"blue-flower-forearm","title":{"en":"Blue Flower with Green Leaves Forearm","es":"Flor Azul con Hojas Verdes en Antebrazo"},"description":"","price":"","images":[{"filename":"Blue Flower Forearm","path":"/images/tattoos/blue-flower-tattoo-green-leaves-forearm.jpg","alt":"Blue Flower Forearm"}],"category":"botanical, colour, fineline","category_es":"botánico, color, línea fina"}];
const tattoosData = {
  items,
};

const lotusForearm = new Proxy({"src":"/_astro/forearm-pink-lotus-tattoo-leaves.D1cStJe_.jpg","width":1920,"height":2560,"format":"jpg","orientation":1}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/xampp/htdocs/nikipepperstattoo/src/assets/tattoos/botanical/forearm-pink-lotus-tattoo-leaves.jpg";
							}
							
							return target[name];
						}
					});

const pinkPetals = new Proxy({"src":"/_astro/pink-flower-tattoo-green-leaves-petals.B5Tw4Gmy.jpg","width":1920,"height":2560,"format":"jpg","orientation":1}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/xampp/htdocs/nikipepperstattoo/src/assets/tattoos/botanical/pink-flower-tattoo-green-leaves-petals.jpg";
							}
							
							return target[name];
						}
					});

const birdFlowers = new Proxy({"src":"/_astro/bird-tattoo-orange-grey-feathers-flowers.-Vk46ib7.jpg","width":1920,"height":2560,"format":"jpg","orientation":1}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/xampp/htdocs/nikipepperstattoo/src/assets/tattoos/animals/bird-tattoo-orange-grey-feathers-flowers.jpg";
							}
							
							return target[name];
						}
					});

const redPoppyClose = new Proxy({"src":"/_astro/red-poppy-tattoo-chest-closeup.B4YRj_ZY.jpeg","width":1707,"height":2560,"format":"jpg","orientation":1}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/xampp/htdocs/nikipepperstattoo/src/assets/tattoos/botanical/red-poppy-tattoo-chest-closeup.jpeg";
							}
							
							return target[name];
						}
					});

const birdForearm = new Proxy({"src":"/_astro/bird-tattoo-forearm-orange-grey-feathers.IsS2oJ68.jpg","width":1920,"height":2560,"format":"jpg","orientation":1}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/xampp/htdocs/nikipepperstattoo/src/assets/tattoos/animals/bird-tattoo-forearm-orange-grey-feathers.jpg";
							}
							
							return target[name];
						}
					});

const succulent = new Proxy({"src":"/_astro/blue-green-succulent-pink-yellow-flowers-tattoo.D5j9VSHS.jpeg","width":1710,"height":2560,"format":"jpg","orientation":1}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/xampp/htdocs/nikipepperstattoo/src/assets/tattoos/botanical/blue-green-succulent-pink-yellow-flowers-tattoo.jpeg";
							}
							
							return target[name];
						}
					});

const purpleWhite = new Proxy({"src":"/_astro/purple-white-flower-forearm-tattoo-green-leaves.Cwft5p4T.jpg","width":2137,"height":2560,"format":"jpg","orientation":1}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/xampp/htdocs/nikipepperstattoo/src/assets/tattoos/botanical/purple-white-flower-forearm-tattoo-green-leaves.jpg";
							}
							
							return target[name];
						}
					});

export { birdFlowers as a, birdForearm as b, pinkPetals as c, lotusForearm as l, purpleWhite as p, redPoppyClose as r, succulent as s, tattoosData as t };
