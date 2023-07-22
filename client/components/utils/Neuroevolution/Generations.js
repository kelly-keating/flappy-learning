import Generation from './Generation'
import Network from './Network'

/*GENERATIONS*****************************************************************/
/**
 * Generations class.
 *
 * Hold's previous Generations and current Generation.
 *
 * @constructor
 */
var Generations = function (self) {
  this.self = self
  this.generations = [];
  var currentGeneration = new Generation(this.self);
}

/**
 * Create the first generation.
 *
 * @param {input} Input layer.
 * @param {input} Hidden layer(s).
 * @param {output} Output layer.
 * @return First Generation.
 */
Generations.prototype.firstGeneration = function (input, hiddens, output) {
  // FIXME input, hiddens, output unused.

  var out = [];
  for (var i = 0; i < this.self.options.population; i++) {
    // Generate the Network and save it.
    var nn = new Network(this.self);
    nn.perceptronGeneration(this.self.options.network[0],
      this.self.options.network[1],
      this.self.options.network[2]);
    out.push(nn.getSave());
  }

  this.generations.push(new Generation(this.self));
  return out;
}

/**
 * Create the next Generation.
 *
 * @return Next Generation.
 */
Generations.prototype.nextGeneration = function () {
  if (this.generations.length == 0) {
    // Need to create first generation.
    return false;
  }

  // console.log(this.generations)
  var gen = this.generations[this.generations.length - 1].generateNextGeneration();
  this.generations.push(new Generation(this.self));
  // console.log(this.generations)

  return gen;
}

/**
 * Add a genome to the Generations.
 *
 * @param {genome}
 * @return False if no Generations to add to.
 */
Generations.prototype.addGenome = function (genome) {
  // Can't add to a Generation if there are no Generations.
  if (this.generations.length == 0) return false;

  // FIXME addGenome returns void.
  return this.generations[this.generations.length - 1].addGenome(genome);
}

export default Generations