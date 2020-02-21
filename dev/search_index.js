var documenterSearchIndex = {"docs":
[{"location":"api/#API-1","page":"API","title":"API","text":"","category":"section"},{"location":"api/#Parameters-1","page":"API","title":"Parameters","text":"","category":"section"},{"location":"api/#","page":"API","title":"API","text":"The parameters below are required for any simulation. They should be in a dictionary object. The dictionary keys should be the parameters names as Symbol (with a colon \":\" before the name). See the Tutorial page for an example of the parameters dictionary.","category":"page"},{"location":"api/#","page":"API","title":"API","text":"m: A tuple specifying the ploidy of each species. Currently only support m=1 (haploid) and m=2 (diploid).\nP: A tuple specifying the number of phenotypes p for each species.\nL: A tuple specifying the number of loci l for each species.\nR: A tuple specifying growth rate for each species. Growth rates are for a logistic growth model, where N_t+1 = N_t + rtimes Ntimes (1 - ((NK)), where N is population size, t is time, r is growth rate and K is carrying capacity. If r=0, population size remains constant.\nC: A matrix containing competition coefficients between each pair of species. A competition coefficient denotes the strength of competition exerted by an individual of species j on an individual of species i. It uses the Lotka-Voltera equation Ni_t+1 = Ni_t + rtimes Ntimes (1 - ((Ni + cNj)K) where c is competition coefficient. When competition coefficient is positive, population j competes with population i. If negative, population j helps population i to grow. And if 0, population j does not affect population i. If c_ij  0 and c_ji  0, both populations are in competition, if c_ij  0 and c_ji  0, species i is a parasite of species j. If c_ij  0 and c_ji  0, the two species have a mutualistic relationship. If c_ij  0 and c_ji = 0, they have a commensal relationship.\nB: A tuple of pleiotropy matrices, one for each species. A pleitropy matrix is a binary matrix with size p times l that specifies the phenotypes that each locus affects.\nA: A tuple of epistasis matrices, one for each species. An epistasis matrix is of size l times l and specifies the direction (positive or negative) and size of effect of one loci on the other loci. For example, if at row 1 and column 2 is a value 0.2, it means that locus 1 affects locus 2 by increasing the effect of locus 2 (because its positive) with 20% of the effect of locus 1. The effect of loci are themselves specified in the q vector.\nQ: A tuple of expression arrays, one for each species. An expression array q shows the effect size of a locus. It can be thought of expression level of a gene.\nY: A tuple  of selection coefficients for each species.\nT: A tuple of arrays, where each inner array specifies optimal phenotypes θ for each species. Each inner array should be of length p (number of phenotypes) of its corresponding species.\nΩ: A tuple of matrices, each of which ω represents a covariance matrix of the selection surface. Each matrix is of size ptimes p.\nM: A tuple of arrays, one per species. Each inner array specifies the probabilities for different type of mutations. An inner array has three values with the following order: first, the probability that an individual's gene expressions (array q) mutate per generation. Second, the probability that an individual's pleiotropy matrix mutates per generation. Third, the probability that an individual's epistasis matrix mutates per generation. If an individual is going to receive a mutation at any of the mentioned levels, the amount of change that it receives is determined by D.\nD: A tuple of arrays, one for each species. Each inner array has three numbers specifying the amount of change per mutation in gene expression (q), pleiotropy matrix (b), and epistasis matrix a, respectively. The first number is the variance of a normal distribution with mean zero. If an individual's gene expression is going to mutate, random numbers from that distribution are added to the expression of each locus. The second number is a probability that any one element in the pleiotropy matrix will switch - if on, becomes off, and vice versa. The third number is again the variance of another normal distribution with mean zero. Random numbers taken from such distribution are added to each element of the epistasis matrix.\nN: A dictionary where each key is a node number and its value is a tuple for population size of each species at that node. This dictionary does not have to have a key for all the nodes, but it should have a value for all the species.\nK: A dictionary where each key is a node number and its value is tuple of carrying capacities K of the node for each species. The dictionary should have a key for all the nodes and carrying capacity for each species per node.\nmigration_rates: An array of matrices, each matrix shows of migration rates between each pair of nodes for a species. The rows and columns of the matrix are node numbers in order. If instead of a matrix, there is nothing, no migration occurs for that species.\nE: A tuple  of the variance of a normal distribution ε representing environmental noise for each species.\ngenerations: number of generations to run the simulation.\nspace: (default=nothing) Either a tuple of size 2 or 3 for a grid size or a SimpleGraph object for an arbitrary graph. If it is a tuple, a grid is built internally\nmoore: (default=false) Whether nodes in the grid have 8 neighbors (Moore neighborhood). Default is false, i.e. cells only have 4 neighbors.\nperiodic: (default=false) If space is 2D, should the edges connect to the opposite side?\nseed: (default=0). Seed for random number generator. Only set if >0.","category":"page"},{"location":"api/#Simulation-outline-1","page":"API","title":"Simulation outline","text":"","category":"section"},{"location":"api/#","page":"API","title":"API","text":"Within each time-step, the following occurs:","category":"page"},{"location":"api/#","page":"API","title":"API","text":"Mutation\nFitness update\nMigration\nReproduction (only for diploids)\nselection","category":"page"},{"location":"api/#Mutation-1","page":"API","title":"Mutation","text":"","category":"section"},{"location":"api/#","page":"API","title":"API","text":"Mutation can happen at three levels: changing the expression of each gene Q, changing the pleiotropy matrix B, and changing the epistatic interactions between genes. The probability that a mutation occurs at each of these levels is controlled by parameter M. And size of mutations when they occur are controlled by parameter D. The genotype vector y and pleiotropy matrix B of each individual mutates.","category":"page"},{"location":"api/#","page":"API","title":"API","text":"Epistatic matrix A and expression vectors Q mutate by adding their values to random numbers from a normal distribution with mean 0 and standard deviation given in parameter D.","category":"page"},{"location":"api/#","page":"API","title":"API","text":"B mutates by randomly switching 0s and 1s with probability given in parameter D.","category":"page"},{"location":"api/#Fitness-update-1","page":"API","title":"Fitness update","text":"","category":"section"},{"location":"api/#","page":"API","title":"API","text":"Fitness of each individual updates after mutation. Fitness is W = exp(γ times transpose(z - θ)times inv(ω)times (z - θ)), where is the phenotype vector (z = B(Aq) + μ), γ is selection coefficient, θ is optimum phenotypes vector, and ω is covariance matrix of selection surface. ","category":"page"},{"location":"api/#Migration-1","page":"API","title":"Migration","text":"","category":"section"},{"location":"api/#","page":"API","title":"API","text":"Each agent moves with probabilities given in migration_rates to other nodes.","category":"page"},{"location":"api/#Reproduction-1","page":"API","title":"Reproduction","text":"","category":"section"},{"location":"api/#","page":"API","title":"API","text":"When a species is diploid, they sexually reproduce. To that end, individuals of the same species in the same location are randomly paired. Each pair produces one offspring. Then the parents die.","category":"page"},{"location":"api/#","page":"API","title":"API","text":"To produce an offspring, each parent contributes to half of the offspring's genotype y and pleiotropy matrix B. The genes coming from each parent are randomly assigned.","category":"page"},{"location":"api/#Selection-1","page":"API","title":"Selection","text":"","category":"section"},{"location":"api/#","page":"API","title":"API","text":"A number of individuals n are selected for the next generation via sampling with replacement weighted by individuals' fitness values. n is calculated using the Lotka-Voltera model for population competition Ni_t+1 = Ni_t + rtimes Ntimes (1 - ((Ni + cNj)K) where N is population size, t is time, r is growth rate and K is carrying capacity, and c is competition coefficient. Briefly, each population growth with a logistic model when it is not affected by other species. Otherwise, its growth increases or decreases depending on its interactions with other species.","category":"page"},{"location":"api/#Data-collection-1","page":"API","title":"Data collection","text":"","category":"section"},{"location":"api/#","page":"API","title":"API","text":"The interface to the model is from the runmodel function.","category":"page"},{"location":"api/#","page":"API","title":"API","text":"runmodel","category":"page"},{"location":"api/#EvoDynamics.runmodel","page":"API","title":"EvoDynamics.runmodel","text":"runmodel(parameters::Dict; kwargs)\n\nCreates and runs a model given parameters. Returns a DataFrame of collected data, which are specified by kwargs.\n\nKeywords\n\ncollect::Dict=Dict(:model => [meanfitnessper_species]) Data to be collected. By default, collects mean population fitness per species. Each row of the output DataFrame corresponds to all agents and each column is the value function applied to a field. The functions in a dictionary properties are applied to the collected fields, that is, the keys of properties. For example, to collect mean and median fitness of individuals which is in field W, your dictionary will be Dict(:W => [mean, median]).\nwhen::AbstractArray{Int}=1:parameters[:generations] The generations from which data are collected\nreplicates::Int = 0 Number of replicates per simulation.\nparallel::Bool = false Whether to run replicates in parallel. If true, you should add processors to your julia session (e.g. by addprocs(n)) and define your parameters and EvoDynamics on all workers. To do that, add @everywhere before them. For example, @everywhere EvoDynamics.\n\n\n\n\n\n","category":"function"},{"location":"api/#","page":"API","title":"API","text":"EvoDynamics.jl uses Agents.jl underneath. See Agents.jl's documentation for details about writing functions to collect any data during simulations. Here, we explain the specific implementation of the model.","category":"page"},{"location":"api/#","page":"API","title":"API","text":"There are two main objects from which you can collect data: and agent object of type AbstractAgent and a model object of type ABM. Both of these types are defined the Agents.jl package.","category":"page"},{"location":"api/#","page":"API","title":"API","text":"Agent object has the following fields: id, positions, species, A (epistasis matrix), B (pleiotropy matrix), and q (gene expression array).","category":"page"},{"location":"api/#","page":"API","title":"API","text":"The model object has the following fields: space which is a Space object from Agents.jl, agents that is an array holding all agents, and properties which is a dictionary holding all the parameters passed to the model.","category":"page"},{"location":"api/#","page":"API","title":"API","text":"To collect data, provide a dictionary where the keys are either agent fields, or :model. The value of a key is an array of any number of functions.","category":"page"},{"location":"api/#","page":"API","title":"API","text":"If a key is an agent field, all the value of the field from all agents are collected and then aggregated with the functions in the value. For example, to collect mean and median fitness of individuals which is in field W, your dictionary will be Dict(:W => [mean, median]).","category":"page"},{"location":"api/#","page":"API","title":"API","text":"If a key is :model, functions in its value array should be functions that accept a single argument, the model object, and return a single number or a tuple of numbers. For example, this is the default dictionary and its function:","category":"page"},{"location":"api/#","page":"API","title":"API","text":"collect = Dict(:model => [mean_fitness_per_species])\n\n\"Returns a tuple whose entries are the mean fitness of each species.\"\nfunction mean_fitness_per_species(model::ABM)\n  nspecies = length(model.properties[:P])\n  mean_fitness = Array{Float32}(undef, nspecies)\n  for species in 1:nspecies\n    fitness = mean([i.W for i in values(model.agents) if i.species == species])\n    mean_fitness[species] = fitness\n  end\n\n  return Tuple(mean_fitness)\nend","category":"page"},{"location":"example2/#","page":"Dummy example 2","title":"Dummy example 2","text":"EditURL = \"https://github.com/kavir1698/EvoDynamics.jl/blob/master/examples/example2.jl\"","category":"page"},{"location":"example2/#Dummy-example-2-1","page":"Dummy example 2","title":"Dummy example 2","text":"","category":"section"},{"location":"example2/#","page":"Dummy example 2","title":"Dummy example 2","text":"b = 2","category":"page"},{"location":"example2/#","page":"Dummy example 2","title":"Dummy example 2","text":"","category":"page"},{"location":"example2/#","page":"Dummy example 2","title":"Dummy example 2","text":"This page was generated using Literate.jl.","category":"page"},{"location":"example1/#","page":"Simplest model","title":"Simplest model","text":"EditURL = \"https://github.com/kavir1698/EvoDynamics.jl/blob/master/examples/example1.jl\"","category":"page"},{"location":"example1/#Simplest-model-1","page":"Simplest model","title":"Simplest model","text":"","category":"section"},{"location":"example1/#","page":"Simplest model","title":"Simplest model","text":"We can create and run simple Wright-Fisher simulations with EvoDynamics.jl. To that end, we define a single haploid species, in single region, with a single gene affecting a single phenotype. The values of parameters below are set arbitrarily.","category":"page"},{"location":"example1/#","page":"Simplest model","title":"Simplest model","text":"using EvoDynamics\n\nparameters = Dict(\n  :L => (1),\n  :P => (1),\n  :R => (0.7),\n  :C => nothing,\n  :B => [[true]],\n  :A =>  [[1.0]],\n  :Q => [[1.0]],\n  :Y => (0.5),\n  :m => (1),\n  :T => [[2.4]],\n  :Ω => [[0.8]],\n  :M => [(0.1, 0.0, 0.0)],\n  :D => [(0.05, 0.0, 0.01)],\n  :N => Dict(1 => (100)),\n  :K => Dict(1 => [1000]),\n  :migration_rates => [nothing],\n  :E => (0.01),\n  :generations => 10,\n  :space => nothing\n)\n\ndata = runmodel(parameters)","category":"page"},{"location":"example1/#","page":"Simplest model","title":"Simplest model","text":"","category":"page"},{"location":"example1/#","page":"Simplest model","title":"Simplest model","text":"This page was generated using Literate.jl.","category":"page"},{"location":"#EvoDynamics.jl-Documentation-1","page":"Introduction","title":"EvoDynamics.jl Documentation","text":"","category":"section"},{"location":"#","page":"Introduction","title":"Introduction","text":"EvoDynamics.jl tries to bridge the gap in studying biological systems at small and large scales. Some studies only focus on single genes affecting single phenotypes, some studies only analyze gene interactions, some focus on populations, and some on species interactions. EvoDynamics.jl is a framework to study the effect of interactions between all these levels. It includes explicit pleiotropy, epistasis, selection acting on multiple phenotypes, different phenotypes affecting fitness at different amounts, arbitrary spatial structure, migration, and interacting species.","category":"page"},{"location":"#","page":"Introduction","title":"Introduction","text":"Figure below shows different biological levels controlled by the model.","category":"page"},{"location":"#","page":"Introduction","title":"Introduction","text":"(Image: Fig. 1. __Model structure.__)","category":"page"},{"location":"#","page":"Introduction","title":"Introduction","text":"We used the paper below as a starting point for this project. But EvoDynamics.jl goes way beyond that system by including multi-species interactions, spatial structure, and explicitly implementing epistasis and gene expression.","category":"page"},{"location":"#","page":"Introduction","title":"Introduction","text":"Melo, D., & Marroig, G. (2015). Directional selection can drive the evolution of modularity in complex traits. Proceedings of the National Academy of Sciences, 112(2), 470–475. https://doi.org/10.1073/pnas.1322632112","category":"page"},{"location":"#","page":"Introduction","title":"Introduction","text":"See Tutorial for running the model, and API for a description of model parameters and simulation outline.","category":"page"},{"location":"tutorial/#Tutorial-1","page":"Tutorial","title":"Tutorial","text":"","category":"section"},{"location":"tutorial/#EvoDynamics.jl's-basic-usage-1","page":"Tutorial","title":"EvoDynamics.jl's basic usage","text":"","category":"section"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"First, define your model parameters. Below is a set of random parameters. See API for a description of each parameter.","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"using Random\nimport LinearAlgebra: Symmetric\n\nP = (4, 5)\nL = (7, 8)\nm = (2, 1)\n# choose random values for epistasis matrix A, but make sure the diagonal is \n# 1.0, meaning that each locus affects itself 100%.\nA = Tuple([Random.rand(-0.5:0.01:0.5, i, i) for i in (L .* m)])\nfor index in 1:length(A)\n  for diag in 1:size(A[index], 1)\n    A[index][diag, diag] = 1\n  end\nend\n\nparameters = Dict(\n  :L => L .* m,\n  :P => P,\n  :R => (0.8, 0.12),\n  :C => rand(-0.1:0.01:0.1, 2, 2),\n  :B => (rand([true, false], P[1], L[1] * m[1]), rand([true, false], P[2], L[2] * m[2])),\n  :A =>  A,\n  :Q => Tuple([rand() for el in 1:l] for l in L .* m),\n  :Y => (0.5, 0.5),\n  :m => m,\n  :T => Tuple([randn(Float16, n) for n in P]),\n  :Ω => Tuple([Symmetric(rand(Float16, i[1], i[2])) for i in zip(P, P)]),\n  :M => Tuple([(0.02, 0.0, 0.0), (0.02, 0.0, 0.0)]),\n  :D => Tuple([(0.05, 0.0, 0.01), (0.05, 0.0, 0.01)]),\n  :N => Dict(1 => (1000, 1000)),\n  :K => Dict(1 => [1000, 1000], 2 => [1000, 1000], 3 => [1000, 1000], 4 => [1000, 1000]),\n  :migration_rates => [[1.0 0.02 0.02 0.02; 0.03 1.0 0.03 0.03; 0.01 0.01 1.0 0.01; 0.01 0.01 0.01 1.0] for i in 1:2],\n  :E => (0.01, 0.01),\n  :generations => 5,\n  :space => (2,2),\n  :moore => false\n)","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"We can the use the runmodel function to create a model from these parameters and run the simulation.","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"runmodel","category":"page"},{"location":"tutorial/#","page":"Tutorial","title":"Tutorial","text":"using EvoDynamics\ndata = runmodel(parameters)\ndata[1:5, :]","category":"page"}]
}
