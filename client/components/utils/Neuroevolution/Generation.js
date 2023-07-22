/*GENERATION******************************************************************/
/**
 * Generation class.
 *
 * Composed of a set of Genomes.
 *
 * @constructor
 */
var Generation = function (self) {
  this.genomes = [];
  this.self = self;
}

/**
 * Add a genome to the generation.
 *
 * @param {genome} Genome to add.
 * @return void.
 */
Generation.prototype.addGenome = function (genome) {
  // Locate position to insert Genome into.
  // The gnomes should remain sorted.
  for (var i = 0; i < this.genomes.length; i++) {
    // Sort in descending order.
    if (this.self.options.scoreSort < 0) {
      if (genome.score > this.genomes[i].score) {
        break;
      }
      // Sort in ascending order.
    } else {
      if (genome.score < this.genomes[i].score) {
        break;
      }
    }

  }

  // Insert genome into correct position.
  this.genomes.splice(i, 0, genome);
}

/**
 * Breed to genomes to produce offspring(s).
 *
 * @param {g1} Genome 1.
 * @param {g2} Genome 2.
 * @param {nbChilds} Number of offspring (children).
 */
Generation.prototype.breed = function (g1, g2, nbChilds) {
  var datas = [];
  for (var nb = 0; nb < nbChilds; nb++) {
    // Deep clone of genome 1.
    var data = JSON.parse(JSON.stringify(g1));
    for (var i in g2.network.weights) {
      // Genetic crossover
      // 0.5 is the crossover factor.
      // FIXME Really should be a predefined constant.
      if (Math.random() <= 0.5) {
        data.network.weights[i] = g2.network.weights[i];
      }
    }

    // Perform mutation on some weights.
    for (var i in data.network.weights) {
      if (Math.random() <= this.self.options.mutationRate) {
        data.network.weights[i] += Math.random() *
          this.self.options.mutationRange *
          2 -
          this.self.options.mutationRange;
      }
    }
    datas.push(data);
  }

  return datas;
}

/**
 * Generate the next generation.
 *
 * @return Next generation data array.
 */
Generation.prototype.generateNextGeneration = function () {
  var nexts = [];

  for (var i = 0; i < Math.round(this.self.options.elitism *
      this.self.options.population); i++) {
    if (nexts.length < this.self.options.population) {
      // Push a deep copy of ith Genome's Nethwork.
      nexts.push(JSON.parse(JSON.stringify(this.genomes[i].network)));
    }
  }

  for (var i = 0; i < Math.round(this.self.options.randomBehaviour *
      this.self.options.population); i++) {
    var n = JSON.parse(JSON.stringify(this.genomes[0].network));
    for (var k in n.weights) {
      n.weights[k] = this.self.options.randomClamped();
    }
    if (nexts.length < this.self.options.population) {
      nexts.push(n);
    }
  }

  var max = 0;
  while (true) {
    for (var i = 0; i < max; i++) {
      // Create the children and push them to the nexts array.
      var childs = this.breed(this.genomes[i], this.genomes[max],
        (this.self.options.nbChild > 0 ? this.self.options.nbChild : 1));
      for (var c in childs) {
        nexts.push(childs[c].network);
        if (nexts.length >= this.self.options.population) {
          // Return once number of children is equal to the
          // population by generatino value.
          return nexts;
        }
      }
    }
    max++;
    if (max >= this.genomes.length - 1) {
      max = 0;
    }
  }
}

export default Generation