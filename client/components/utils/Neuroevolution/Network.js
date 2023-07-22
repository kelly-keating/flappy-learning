import Layer from './Layer'

/*NEURAL NETWORK**************************************************************/
/**
 * Neural Network class
 *
 * Composed of Neuron Layers.
 *
 * @constructor
 */
var Network = function (self) {
  this.self = self
  this.layers = [];
}

/**
 * Generate the Network layers.
 *
 * @param {input} Number of Neurons in Input layer.
 * @param {hidden} Number of Neurons per Hidden layer.
 * @param {output} Number of Neurons in Output layer.
 * @return void
 */
Network.prototype.perceptronGeneration = function (input, hiddens, output) {
  var index = 0;
  var previousNeurons = 0;
  var layer = new Layer(this.self, index);
  layer.populate(input, previousNeurons); // Number of Inputs will be set to
  // 0 since it is an input layer.
  previousNeurons = input; // number of input is size of previous layer.
  this.layers.push(layer);
  index++;
  for (var i in hiddens) {
    // Repeat same process as first layer for each hidden layer.
    var layer = new Layer(this.self, index);
    layer.populate(hiddens[i], previousNeurons);
    previousNeurons = hiddens[i];
    this.layers.push(layer);
    index++;
  }
  var layer = new Layer(this.self, index);
  layer.populate(output, previousNeurons); // Number of input is equal to
  // the size of the last hidden
  // layer.
  this.layers.push(layer);
}

/**
 * Create a copy of the Network (neurons and weights).
 *
 * Returns number of neurons per layer and a flat array of all weights.
 *
 * @return Network data.
 */
Network.prototype.getSave = function () {
  var datas = {
    neurons: [], // Number of Neurons per layer.
    weights: [] // Weights of each Neuron's inputs.
  };

  for (var i in this.layers) {
    datas.neurons.push(this.layers[i].neurons.length);
    for (var j in this.layers[i].neurons) {
      for (var k in this.layers[i].neurons[j].weights) {
        // push all input weights of each Neuron of each Layer into a flat
        // array.
        datas.weights.push(this.layers[i].neurons[j].weights[k]);
      }
    }
  }
  return datas;
}

/**
 * Apply network data (neurons and weights).
 *
 * @param {save} Copy of network data (neurons and weights).
 * @return void
 */
Network.prototype.setSave = function (save) {
  var previousNeurons = 0;
  var index = 0;
  var indexWeights = 0;
  this.layers = [];
  for (var i in save.neurons) {
    // Create and populate layers.
    var layer = new Layer(this.self, index);
    layer.populate(save.neurons[i], previousNeurons);
    for (var j in layer.neurons) {
      for (var k in layer.neurons[j].weights) {
        // Apply neurons weights to each Neuron.
        layer.neurons[j].weights[k] = save.weights[indexWeights];

        indexWeights++; // Increment index of flat array.
      }
    }
    previousNeurons = save.neurons[i];
    index++;
    this.layers.push(layer);
  }
}

/**
 * Compute the output of an input.
 *
 * @param {inputs} Set of inputs.
 * @return Network output.
 */
Network.prototype.compute = function (inputs) {
  // Set the value of each Neuron in the input layer.
  for (var i in inputs) {
    if (this.layers[0] && this.layers[0].neurons[i]) {
      this.layers[0].neurons[i].value = inputs[i];
    }
  }

  var prevLayer = this.layers[0]; // Previous layer is input layer.
  for (var i = 1; i < this.layers.length; i++) {
    for (var j in this.layers[i].neurons) {
      // For each Neuron in each layer.
      var sum = 0;
      for (var k in prevLayer.neurons) {
        // Every Neuron in the previous layer is an input to each Neuron in
        // the next layer.
        sum += prevLayer.neurons[k].value *
          this.layers[i].neurons[j].weights[k];
      }

      // Compute the activation of the Neuron.
      this.layers[i].neurons[j].value = this.self.options.activation(sum);
    }
    prevLayer = this.layers[i];
  }

  // All outputs of the Network.
  var out = [];
  var lastLayer = this.layers[this.layers.length - 1];
  for (var i in lastLayer.neurons) {
    out.push(lastLayer.neurons[i].value);
  }
  return out;
}

export default Network