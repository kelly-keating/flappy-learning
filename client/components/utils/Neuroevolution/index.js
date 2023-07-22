import Generations from './Generations'
import Genome from './Genome'
import Network from './Network'

/**
 * Provides a set of classes and methods for handling Neuroevolution and
 * genetic algorithms.
 *
 * @param {options} An object of options for Neuroevolution.
 */
var Neuroevolution = function (options) {
	// var self = this; // reference to the top scope of this module

	// Declaration of module parameters (options) and default values
	this.options = {
		/**
		 * Logistic activation function.
		 *
		 * @param {a} Input value.
		 * @return Logistic function output.
		 */
		activation: (a) => (1 / (1 + Math.exp((-a) / 1))),

		/**
		 * Returns a random value between -1 and 1.
		 *
		 * @return Random value.
		 */
		randomClamped: () => Math.random() * 2 - 1,

		// various factors and parameters (along with default values).
		network: [1, [1], 1], // Perceptron network structure (1 hidden
		// layer).
		population: 50, // Population by generation.
		elitism: 0.2, // Best networks kepts unchanged for the next
		// generation (rate).
		randomBehaviour: 0.2, // New random networks for the next generation
		// (rate).
		mutationRate: 0.1, // Mutation rate on the weights of synapses.
		mutationRange: 0.5, // Interval of the mutation changes on the
		// synapse weight.
		historic: 0, // Latest generations saved.
		lowHistoric: false, // Only save score (not the network).
		scoreSort: -1, // Sort order (-1 = desc, 1 = asc).
		nbChild: 1 // Number of children by breeding.

	}



	// Overriding default options with the pass in options
	this.set(options);

	/*SELF************************************************************************/
	this.generations = new Generations(this);
	console.log('Neuro constructor')

}

	/**
	 * Override default options.
	 *
	 * @param {options} An object of Neuroevolution options.
	 * @return void
	 */
	Neuroevolution.prototype.set = function (options) {
		for (var i in options) {
			if (this.options[i] != undefined) { // Only override if the passed in value
				// is actually defined.
				this.options[i] = options[i];
			}
		}
	}

	/**
	 * Reset and create a new Generations object.
	 *
	 * @return void.
	 */
	Neuroevolution.prototype.restart = function () {
		this.generations = new Generations(this);
	}


	/**
	 * Create the next generation.
	 *
	 * @return Neural Network array for next Generation.
	 */
	Neuroevolution.prototype.nextGeneration = function () {
		var networks = [];

		console.log('nextGen', this.generations.generations)

		if (this.generations.generations.length == 0) {
			console.log('first')
			// If no Generations, create first.
			networks = this.generations.firstGeneration();
		} else {
			console.log('next')
			// Otherwise, create next one.
			console.log(this.generations)
			networks = this.generations.nextGeneration();
			console.log(this.generations)
		}

		// Create Networks from the current Generation.
		var nns = [];
		for (var i in networks) {
			var nn = new Network(this);
			nn.setSave(networks[i]);
			nns.push(nn);
		}

		if (this.options.lowHistoric) {
			// Remove old Networks.
			if (this.generations.generations.length >= 2) {
				var genomes =
					this.generations
					.generations[this.generations.generations.length - 2]
					.genomes;
				for (var i in genomes) {
					delete genomes[i].network;
				}
			}
		}

		if (this.options.historic != -1) {
			// Remove older generations.
			if (this.generations.generations.length > this.options.historic + 1) {
				this.generations.generations.splice(0,
					this.generations.generations.length - (this.options.historic + 1));
			}
		}

		return nns;
	}

/**
 * Adds a new Genome with specified Neural Network and score.
 *
 * @param {network} Neural Network.
 * @param {score} Score value.
 * @return void.
 */
Neuroevolution.prototype.networkScore = function (network, score) {
	this.generations.addGenome(new Genome(this, score, network.getSave()));
}

export default Neuroevolution