function testingFunctions() {
    test_group('Selectors', function() {
        assert(countingLogoImage(), "simple successful test");
        assert(countingFiveTweet(), "counting 5 tweet-username classes under ot-body class");
        assert(findNonId(), "not finding any non-existant ids of elements");
    });

    test_group('CSS functions', function() {
        assert(removeClass(), "removeClass() remove papa class");
        assert(addsPapaClass(), "addClass() adds papa class");
        assert(changeColorWord(), "css() sets welcome-header to green");
    });

    test_group('Functional functions tests', function() {
        assert(allFunctionWork(), "all function works with multiple functions");
        assert(testIfAllSuccess(), "all function counts 1 child for all nav-btn class elements");
        assert(testIfOneFeild(), "any function doesn't find a nav-btn class element with no children");
    });
}