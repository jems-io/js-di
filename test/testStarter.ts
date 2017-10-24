describe('The kernel,', function () {

  describe('when is resolving,', function () {

    describe('if everithing is good,', function () {
            // Test the instance servicing strategy
      require('./testInstanceServicingStrategy')

            // Test the constant servicing strategy
      require('./testConstantServicingStrategy')

            // Test the function builder servicing strategy
      require('./testBuilderFunctionServicingStrategy')

            // Test the contention
      require('./testContention')

            // Test the alias sufixing configuration
      require('./testAliasSufixingConfiguration')
    })

    describe('if something is bad,', function () {
            //  Test the error triggering
      require('./testErrorTriggering')
    })
  })
})
