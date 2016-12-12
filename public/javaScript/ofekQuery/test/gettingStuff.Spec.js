describe('OfekQuery', function () {
    describe('Query selector', function () {
        beforeEach(function () {
            document.body.innerHTML = __html__['index.html'];
        });

        describe('check count function', function () {
            it('Should get all of the elements of the same tag', function () {
                var liAmount = $('li').count();

                expect(liAmount).toEqual(10);
            });
        });

        describe('check the addClass function',function () {
            it('Should set all of the elements the class shaked', function () {
                $('li').addClass('shaked');
                var newAmount = $('.shaked').count();
                expect(newAmount).toEqual(10);
            });
        });

        describe('check removeClass function', function () {
            it('Should remove all of the elements the class shaked', function () {
                $('li').addClass('shaked');
                var beforeAmount = $('.shaked').count();
                $('li').removeClass('shaked');
                var newAmount = $('.shaked').count();

                expect(beforeAmount).toEqual(10);
                expect(newAmount).toEqual(0);
            });
        });

        describe('check appendChild function', function () {
            it('Should add 10 more elements', function () {
                $('ol').appendChild(document.createElement('li'));
                var newChild= $('ol li').count();
                expect(newChild).toEqual(7);
            });
        });

        describe('check map function', function () {
            it('should change the innerHTML of the span', function () {
                var btn = $("span").map(function (element) {
                    return element.innerHTML + "shaked";
                });
                expect(btn[0]).toEqual("hey worldshaked");
            })
        });
    });

    describe('functions check', function () {
        it('Should start the getIdFromDocument function', function () {
            var result = spyOn(window, 'getIdFromDocument');
            runTypeOfSelector('#shakedHaShava', []);
            expect(result).toHaveBeenCalled();
        });

        it('Should start the getTagFromDocument function', function () {
            var result = spyOn(window, 'getTagFromDocument');
            runTypeOfSelector('div', []);
            expect(result).toHaveBeenCalled();
        });

        it('Should start the getClassFromDocument function', function () {
            var result = spyOn(window, 'getClassFromDocument');
            runTypeOfSelector('.shakedHaShava', []);
            expect(result).toHaveBeenCalled();
        })
    });
});