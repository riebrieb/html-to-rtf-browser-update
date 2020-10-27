class Sources {
  static getRtfSourcesReference(value) {
    const buffer = new Buffer(value.replace('data:image/png;base64,', ''), 'base64');
    return ' ' + buffer.toString('hex');
  }
}

module.exports = Sources;