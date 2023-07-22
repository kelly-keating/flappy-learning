/*NEURON**********************************************************************/
/**
 * Artificial Neuron class
 *
 * @constructor
 */
var Neuron = function (self) {
  this.self = self
  this.value = 0;
  this.weights = [];
}

/**
 * Initialize number of neuron weights to random clamped values.
 *
 * @param {nb} Number of neuron weights (number of inputs).
 * @return void
 */
Neuron.prototype.populate = function (nb) {
  this.weights = [];
  for (var i = 0; i < nb; i++) {
    this.weights.push(this.self.options.randomClamped());
  }
}

export default Neuron