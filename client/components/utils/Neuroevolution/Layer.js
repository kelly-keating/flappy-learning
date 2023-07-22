import Neuron from './Neuron'

/*LAYER***********************************************************************/
/**
 * Neural Network Layer class.
 *
 * @constructor
 * @param {index} Index of this Layer in the Network.
 */
var Layer = function (self, index) {
  this.self = self
  this.id = index || 0;
  this.neurons = [];
}

/**
 * Populate the Layer with a set of randomly weighted Neurons.
 *
 * Each Neuron be initialied with nbInputs inputs with a random clamped
 * value.
 *
 * @param {nbNeurons} Number of neurons.
 * @param {nbInputs} Number of inputs.
 * @return void
 */
Layer.prototype.populate = function (nbNeurons, nbInputs) {
  this.neurons = [];
  for (var i = 0; i < nbNeurons; i++) {
    var n = new Neuron(this.self);
    n.populate(nbInputs);
    this.neurons.push(n);
  }
}

export default Layer