var kepentingan = new Array();

            $(document).on('pagebeforeshow', "#index", function() {
                $(document).on('click', "#changePage", function() {
                    var argHarga = $("#harga").val();
                    var argLayar = $("#layar").val();
                    var argProsesor = $("#prosesor").val();
                    var argKapasitasMemori = $("#kapasitas_memori").val();
                    var argTipeMemori = $("#tipe_memori").val();
                    var argHarddisk = $("#harddisk").val();
                    var argBluetooth = $("#bluetooth").val();
                    kepentingan.push(argHarga);
                    kepentingan.push(argLayar);
                    kepentingan.push(argProsesor);
                    kepentingan.push(argKapasitasMemori);
                    kepentingan.push(argTipeMemori);
                    kepentingan.push(argHarddisk);
                    kepentingan.push(argBluetooth);
                    console.log(kepentingan);

                    $.mobile.changePage('#second');
                });
            });

            $(document).on('pagebeforeshow', "#second", function() {
//                calculatedNormalizedDecisionMatrix();
                makelist();
            });
//            var isises = [1, 2, 3];
            var alternatives = ['MSI(GX70 3CC-Black)', 'ACER(aspire-V5-552G)', 'TOSHIBA(Satellite-M50DT-A-106)', 'MSI(GP60-2PE-Leopard-Pro-Black)', 'XENOM(Pegasus-PS15C-BN11)', 'MSI(GS60-2PL-Ghost)', 'ALIENWARE(M17xR5-Anodized-Aluminium)', 'MSI(GT80-2QE-Titan-SLI-Black)',
                'XENOM(Siren-SR14i-DL03)', 'GIGABYTE(P25x-v2)', 'ASUS(G771JM)', 'Triton(Digital-Storm)', 'Aorus(X7-Pro)', 'Origin(EVO15-S)', 'Razer(Blade)'];
            var criterias = ['Harga', 'Layar', 'Prosesor', 'Harddisk', 'Kapasitas Memori', 'Tipe Memori', 'Bluetooth'];
            var costBenefit = ['cost', 'benefit', 'benefit', 'benefit', 'benefit', 'benefit', 'benefit'];
//            var kepentingan = [4, 4, 5, 4, 4, 5, 2];
            var normalizedDecisionMatrix = new Array();
            var sortClosenesCoefficient = new Array();


            var alternatifKriteria = [
                [2, 4, 3, 4, 4, 5, 5],
                [1, 2, 3, 4, 3, 5, 5],
                [1, 2, 3, 2, 1, 3, 3],
                [2, 2, 4, 3, 1, 5, 5],
                [2, 2, 4, 1, 2, 5, 5],
                [2, 2, 4, 4, 2, 5, 5],
                [4, 4, 5, 3, 2, 5, 5],
                [5, 5, 5, 4, 5, 5, 5],
                [2, 1, 5, 4, 2, 5, 5],
                [3, 2, 5, 5, 2, 5, 5],
                [2, 4, 5, 4, 4, 5, 5],
                [3, 2, 5, 3, 2, 5, 5],
                [3, 4, 5, 2, 2, 5, 5],
                [4, 2, 5, 4, 4, 5, 3],
                [4, 1, 5, 1, 4, 5, 5]
            ];

            function calculatedNormalizedDecisionMatrix()
            {
//                var normalized = document.getElementById("normalized");
                var pembagi = new Array();
                var tempNormalizedDecisionMatrix = new Array();
                var normalizedDecisionMatrix = new Array();
                for (var col = 0; col < criterias.length; col++)
                {
                    pembagi[col] = 0;
                    for (var row = 0; row < alternatives.length; row++)
                    {
                        pembagi[col] = pembagi[col] + (alternatifKriteria[row][col] * alternatifKriteria[row][col]);
                    }
                    pembagi[col] = Math.sqrt(pembagi[col]);
                    var normalizedDecision = new Array();
                    for (var row = 0; row < alternatives.length; row++)
                    {
                        normalizedDecision.push(alternatifKriteria[row][col] / pembagi[col]);
                    }
                    tempNormalizedDecisionMatrix.push(normalizedDecision);
                }

                for (var row = 0; row < alternatives.length; row++)
                {
                    var normalizedBaris = new Array();
                    for (var col = 0; col < criterias.length; col++)
                    {
                        normalizedBaris.push(tempNormalizedDecisionMatrix[col][row]);
                    }
                    normalizedDecisionMatrix.push(normalizedBaris);
                }
//    normalized.innerHTML += "<br />" + normalizedDecisionMatrix;
//                console.log(normalizedDecisionMatrix);
                return normalizedDecisionMatrix;
            }

            function calculateWeightNormalizedDecisionMatrix()
            {
                var weightNormalized = document.getElementById("weightNormalized");
                var normalizedDecisionMatrix = calculatedNormalizedDecisionMatrix();
                var tempWeightNormalizedDecisionMatrix = new Array();
                var weightNormalizedDecisionMatrix = new Array();

                for (var col = 0; col < criterias.length; col++)
                {
                    var weightNormalized = new Array();
                    for (var row = 0; row < alternatives.length; row++)
                    {
                        weightNormalized.push(normalizedDecisionMatrix[row][col] * kepentingan[col]);
                    }
                    tempWeightNormalizedDecisionMatrix.push(weightNormalized);
                }

                for (var row = 0; row < alternatives.length; row++)//
                {
                    var normalizedNumber = new Array();
                    var weightNormalizedBaris = new Array();
                    for (var col = 0; col < criterias.length; col++)
                    {
                        weightNormalizedBaris.push(tempWeightNormalizedDecisionMatrix[col][row]);
                    }
                    weightNormalizedDecisionMatrix.push(weightNormalizedBaris);
                }
//    weightNormalized.innerHTML += "<br />" + weightNormalizedDecisionMatrix;
//    console.log(weightNormalizedDecisionMatrix);
                return weightNormalizedDecisionMatrix;
            }

            function calculatePositifIdealSolution()
            {
                var positifIdeal = document.getElementById("positifIdealSolution");
                var max = 0;
                var weightNormalizedDecisionMatrix = calculateWeightNormalizedDecisionMatrix();
                var positifIdealSolution = new Array();

                for (var col = 0; col < criterias.length; col++)
                {
                    var min = weightNormalizedDecisionMatrix[0][col];
                    if (costBenefit[col] == "benefit")
                    {
                        max = 0;
                        for (var row = 0; row < alternatives.length; row++)
                        {
                            if (weightNormalizedDecisionMatrix[row][col] > max)
                            {
                                max = weightNormalizedDecisionMatrix[row][col];
                            }
                            positifIdealSolution[col] = max;
                        }
                    }
                    else
                    {
                        for (var row = 0; row < alternatives.length; row++)
                        {
                            if (weightNormalizedDecisionMatrix[row][col] < min)
                            {
                                min = weightNormalizedDecisionMatrix[row][col];
                            }
                            positifIdealSolution[col] = min;
                        }
                    }
                }
                //    console.log(positifIdealSolution);
                return positifIdealSolution;
            }

            function calculateNegatifIdealSolution()
            {
                var negatifIdeal = document.getElementById("negatifIdealSolution");
                var max = 0;
                var weightNormalizedDecisionMatrix = calculateWeightNormalizedDecisionMatrix();
                var negatifIdealSolution = new Array();
                for (var col = 0; col < criterias.length; col++)
                {
                    min = weightNormalizedDecisionMatrix[0][col];
                    if (costBenefit[col] == "benefit")
                    {
                        for (var row = 0; row < alternatives.length; row++)
                        {
                            if (weightNormalizedDecisionMatrix[row][col] < min)
                            {
                                min = weightNormalizedDecisionMatrix[row][col];
                            }
                            negatifIdealSolution[col] = min;
                        }
                    }
                    else
                    {
                        max = 0;
                        for (var row = 0; row < alternatives.length; row++)
                        {
                            if (weightNormalizedDecisionMatrix[row][col] > max)
                            {
                                max = weightNormalizedDecisionMatrix[row][col];
                            }
                            negatifIdealSolution[col] = max;
                        }
                    }
                }
                //    console.log(negatifIdealSolution);
                return negatifIdealSolution;
            }

            function calculateDistanceAlternativeToPositifSolution()
            {
                var weightNormalizedDecisionMatrix = calculateWeightNormalizedDecisionMatrix();
                var positifIdealSolution = calculatePositifIdealSolution();
                var distanceAlternativeToPositifIdealSolution = new Array();
                var temp = [];

                for (var i = 0; i < alternatives.length; i++)
                {
                    temp[i] = 0;
                }
                for (var row = 0; row < alternatives.length; row++)
                {
                    temp[row] = 0;
                    for (col = 0; col < criterias.length; col++)
                    {
                        temp[row] = temp[row] + ((positifIdealSolution[col] - weightNormalizedDecisionMatrix[row][col]) * (positifIdealSolution[col] - weightNormalizedDecisionMatrix[row][col]));
                    }
                    distanceAlternativeToPositifIdealSolution.push(Math.sqrt(temp[row]));
                }
                //    console.log(positifIdealSolution);
                //    console.log(distanceAlternativeToPositifIdealSolution);
                return distanceAlternativeToPositifIdealSolution;
            }

            function calculateDistanceAlternativeToNegatifSolution()
            {
                var weightNormalizedDecisionMatrix = calculateWeightNormalizedDecisionMatrix();
                var negatifIdealSolution = calculateNegatifIdealSolution();
                var distanceAlternativeToNegatifIdealSolution = new Array();
                var temp = [];

                for (var i = 0; i < alternatives.length; i++)
                {
                    temp[i] = 0;
                }
                for (var row = 0; row < alternatives.length; row++)
                {
                    temp[row] = 0;
                    for (col = 0; col < criterias.length; col++)
                    {
                        temp[row] = temp[row] + ((weightNormalizedDecisionMatrix[row][col] - negatifIdealSolution[col]) * (weightNormalizedDecisionMatrix[row][col] - negatifIdealSolution[col]));
                    }
                    distanceAlternativeToNegatifIdealSolution.push(Math.sqrt(temp[row]));
                }
                //    console.log(negatifIdealSolution);
                //    console.log(distanceAlternativeToNegatifIdealSolution);
                return distanceAlternativeToNegatifIdealSolution;
            }

            function calculateClosenessCoefficient()
            {
                var distanceAlternativeToNegatifIdealSolution = calculateDistanceAlternativeToNegatifSolution();
                var distanceAlternativeToPositifIdealSolution = calculateDistanceAlternativeToPositifSolution();
                var closenessCoefficient = new Array();

                for (var i = 0; i < alternatives.length; i++)
                {
                    closenessCoefficient[i] = distanceAlternativeToNegatifIdealSolution[i] / (distanceAlternativeToNegatifIdealSolution[i] + distanceAlternativeToPositifIdealSolution[i]);
                }
                return closenessCoefficient;
            }

            function calculateSortClosenessCoefficient()
            {
                var closeness = document.getElementById("sortClosenessCoefficient");
                var closenessCoefficient = calculateClosenessCoefficient();
                var all = [];

                for (var i = 0; i < alternatives.length; i++) {
                    all.push({'closenessCoefficient': closenessCoefficient[i], 'alternatives': alternatives[i]});
                }

                all.sort(function(a, b) {
                    return b.closenessCoefficient - a.closenessCoefficient;
                });

                closenessCoefficient = [];
                alternatif = [];

                for (var i = 0; i < all.length; i++) {
                    closenessCoefficient.push(all[i].closenessCoefficient);
                    alternatif.push(all[i].alternatives);
                }
//                console.log(closenessCoefficient, alternatives);
                return closenessCoefficient;
//                return alternatif;
            }

            function calculateSortClosenessAlternative()
            {
                var closenessCoefficient = calculateClosenessCoefficient();
                var all = [];

                for (var i = 0; i < alternatives.length; i++) {
                    all.push({'closenessCoefficient': closenessCoefficient[i], 'alternatives': alternatives[i]});
                }

                all.sort(function(a, b) {
                    return b.closenessCoefficient - a.closenessCoefficient;
                });

                closenessCoefficient = [];
                alternatif = [];

                for (var i = 0; i < all.length; i++) {
                    closenessCoefficient.push(all[i].closenessCoefficient);
                    alternatif.push(all[i].alternatives);
                }
//                console.log(closenessCoefficient, alternatives);
//                console.log(alternatif);
//                return closenessCoefficient;
                return alternatif;
            }



            function makelist() {
//                var closenessCoefficient = calculateSortClosenessCoefficient();
//                console.log(closenessCoefficient);
                var closenessAlternative = calculateSortClosenessAlternative();
//                console.log(closenessAlternative);
                var listContainer = document.createElement("div");
                listContainer.setAttribute('data-role', 'content');
                var closenessSortCoefficient = calculateSortClosenessCoefficient();

//                document.getElementsByTagName("body")[0].appendChild(listContainer);
                document.getElementsByTagName("header")[0].appendChild(listContainer);
                var listElement = document.createElement("ol");
                listElement.setAttribute('data-role', 'listview');
//                listElement.setAttribute('data-inset', 'true');

                listContainer.appendChild(listElement);
//                var numberOfListItems = isises.length;
                var numberOfListItems = closenessSortCoefficient.length;

                for (var i = 0; i < numberOfListItems; ++i) {
                    var listItem = document.createElement("li");
                    listItem.innerHTML = "<strong>"+closenessAlternative[i]+"</strong> ("+closenessSortCoefficient[i]+")" ;
                    listElement.appendChild(listItem);
                }
            }
            
