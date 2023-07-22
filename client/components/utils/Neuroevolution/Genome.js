/*GENOME**********************************************************************/
/**
 * Genome class.
 *
 * Composed of a score and a Neural Network.
 *
 * @constructor
 *
 * @param {score}
 * @param {network}
 */
var Genome = function (self, score, network) {
  this.score = score || 0;
  this.network = network || null;
}

export default Genome