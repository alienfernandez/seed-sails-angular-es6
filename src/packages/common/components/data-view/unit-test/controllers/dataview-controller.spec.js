import angular from 'angular';
import bootstrap from 'app/bootstrap';
//import dataView from 'app/packages/common/components/data-view/controller/dataViewController';
import 'angular-mocks';


describe('dataViewCtrl Controller', () => {
  var dataViewCtrl, lodash, todoStorage = null;

  //function goTo(url) {
  //	$state.go(url);
  //	$rootScope.$digest();
  //}

  // Load the module containing the app, only 'ng' is loaded by default.
  beforeEach(angular.mock.module("common"));

  beforeEach(inject(function (_lodash_) {
    lodash = _lodash_;
  }));

  //$scope, $location, Socket, AuthenticationService, $appConstants, toastr
  describe('initial state ', function () {
    beforeEach(inject(function ($controller) {
      dataViewCtrl = $controller('DataViewController', {
        lodash: lodash
      });

      console.log("dataViewCtrl", dataViewCtrl);
    }));

    it('Null parmas ...111 ', () => {
      console.log("testingggggggggg okok");
      expect(todoStorage).toBeNull();
    });

    it('should not have an edited Todo on start', function () {
    	expect(dataViewCtrl.test).toBeNull();
    });

    //	it('should not have any Todos on start', function () {
    //		expect($scope.todos.length).toBe(0);
    //	});
    //
    //	it('should have all Todos completed', function () {
    //		$scope.$digest();
    //		expect($scope.allChecked).toBeTruthy();
    //	});
  });
  //
  //describe('the filter', function () {
  //	it('should default to ""', inject(function ($controller) {
  //		chatCtrl = $controller('TodoCtrl', {
  //			$rootScope: $rootScope,
  //			$scope: $scope,
  //			$state: $state
  //		});
  //
  //		goTo('todo');
  //		expect($scope.statusFilter).toBeUndefined();
  //	}));
  //});
  //
  //describe('being at /active', function () {
  //	it('should filter non-completed', inject(function ($controller) {
  //		chatCtrl = $controller('TodoCtrl', {
  //			$rootScope: $rootScope,
  //			$scope: $scope,
  //			$state: $state
  //		});
  //
  //		goTo('todo.active');
  //		expect($scope.statusFilter.completed).toBeFalsy();
  //	}));
  //
  //	it('should filter non-completed with predefined state', inject(function ($controller) {
  //		$state.current.url = '/active';
  //
  //		chatCtrl = $controller('TodoCtrl', {
  //			$rootScope: $rootScope,
  //			$scope: $scope,
  //			$state: $state
  //		});
  //
  //		expect($scope.statusFilter.completed).toBeFalsy();
  //	}));
  //});
  //
  //describe('being at /completed', function () {
  //	it('should filter completed', inject(function ($controller) {
  //		chatCtrl = $controller('TodoCtrl', {
  //			$rootScope: $rootScope,
  //			$scope: $scope,
  //			$state: $state
  //		});
  //
  //		goTo('todo.completed');
  //		expect($scope.statusFilter.completed).toBeTruthy();
  //	}));
  //
  //	it('should filter completed with predefined state', inject(function ($controller) {
  //		$state.current.url = '/completed';
  //
  //		chatCtrl = $controller('TodoCtrl', {
  //			$rootScope: $rootScope,
  //			$scope: $scope,
  //			$state: $state
  //		});
  //
  //		expect($scope.statusFilter.completed).toBeTruthy();
  //	}));
  //});
  //
  //describe('having no Todos', function () {
  //	beforeEach(inject(function ($controller) {
  //		chatCtrl = $controller('TodoCtrl', {
  //			$rootScope: $rootScope,
  //			$scope: $scope,
  //			todoStorage: todoStorage
  //		});
  //		$scope.$digest();
  //	}));
  //
  //	it('should not add empty Todos', function () {
  //		$scope.newTodo = '';
  //		$scope.addTodo();
  //		$scope.$digest();
  //		expect($scope.todos.length).toBe(0);
  //	});
  //
  //	it('should not add items consisting only of whitespaces', function () {
  //		$scope.newTodo = '   ';
  //		$scope.addTodo();
  //		$scope.$digest();
  //		expect($scope.todos.length).toBe(0);
  //	});
  //
  //
  //	it('should trim whitespace from new Todos', function () {
  //		$scope.newTodo = '  buy some unicorns  ';
  //		$scope.addTodo();
  //		$scope.$digest();
  //		expect($scope.todos.length).toBe(1);
  //		expect($scope.todos[0].title).toBe('buy some unicorns');
  //	});
  //});
  //
  //describe('having some saved Todos', function () {
  //	beforeEach(inject(function ($controller) {
  //		chatCtrl = $controller('TodoCtrl', {
  //			$rootScope: $rootScope,
  //			$scope: $scope,
  //			todoStorage: todoStorage
  //		});
  //
  //		todoStorage.insert({ title: 'Uncompleted Item 0', completed: false }).then();
  //		todoStorage.insert({ title: 'Uncompleted Item 1', completed: false }).then();
  //		todoStorage.insert({ title: 'Uncompleted Item 2', completed: false }).then();
  //		todoStorage.insert({ title: 'Completed Item 0', completed: true }).then();
  //		todoStorage.insert({ title: 'Completed Item 1', completed: true }).then();
  //		$scope.$digest();
  //	}));
  //
  //	it('should count Todos correctly', function () {
  //		expect($scope.todos.length).toBe(5);
  //		expect($scope.remainingCount).toBe(3);
  //		expect($scope.allChecked).toBeFalsy();
  //	});
  //
  //	it('should save Todos to local storage', function () {
  //		expect($scope.todos.length).toBe(5);
  //	});
  //
  //	it('should remove Todos w/o title on saving', function () {
  //		var todo = todoStorage.todos[2];
  //		$scope.editTodo(todo);
  //		todo.title = '';
  //		$scope.saveEdits(todo);
  //		expect($scope.todos.length).toBe(4);
  //	});
  //
  //	it('should trim Todos on saving', function () {
  //		var todo = todoStorage.todos[0];
  //		$scope.editTodo(todo);
  //		todo.title = ' buy moar unicorns  ';
  //		$scope.saveEdits(todo);
  //		expect($scope.todos[0].title).toBe('buy moar unicorns');
  //	});
  //
  //	it('clearCompletedTodos() should clear completed Todos', function () {
  //		$scope.clearCompletedTodos();
  //		expect($scope.todos.length).toBe(3);
  //	});
  //
  //	it('markAll() should mark all Todos completed', function () {
  //		$scope.markAll(true);
  //		$scope.$digest();
  //		expect($scope.remainingCount).toBe(0);
  //		expect($scope.completedCount).toBe(5);
  //	});
  //
  //	it('revertTodo() get a Todo to its previous state', function () {
  //		var todo = todoStorage.todos[0];
  //		$scope.editTodo(todo);
  //		todo.title = 'Unicorn sparkly skypuffles.';
  //		$scope.revertEdits(todo);
  //		$scope.$digest();
  //		expect($scope.todos[0].title).toBe('Uncompleted Item 0');
  //	});
  //});
});
