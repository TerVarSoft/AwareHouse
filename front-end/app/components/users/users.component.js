(function () {
    'use strict';

    const awareHouseApp = angular.module('awareHouseApp');

    awareHouseApp.controller('UsersCtrl', ['$scope', '$log', '$mdDialog', '$mdEditDialog','ipc',
        function ($scope, $log, $mdDialog, $mdEditDialog, ipc) {

            $scope.$parent.title = "Usuarios";
            $scope.newUser = {};
            $scope.selectedUsers = [];

            ipc.send('get-users', '');

            $scope.createUser = function () {
                saveUser($scope.newUser);
            }

            $scope.editUser = function (event, user, propertyToEdit) {
                event.stopPropagation();

                var promise = $mdEditDialog.large({
                    modelValue: user[propertyToEdit],
                    placeholder: 'Add a comment',
                    save: function (input) {
                        user[propertyToEdit] = input.$modelValue;
                        saveUser(user);
                    },
                    targetEvent: event,
                    validators: { 'aria-label': 'editProperty' }
                });
            }

            $scope.deleteUser = function (event) {
                var deleteConfirm = $mdDialog.confirm()
                    .ariaLabel('deleteUser')
                    .title(`Borrando...!`)
                    .textContent(`Estas seguro de borrar el usuario ${$scope.selectedUsers[0].name}?`)
                    .targetEvent(event)
                    .ok('Borrar')
                    .cancel('Cancelar');

                $mdDialog.show(deleteConfirm).then(function () {
                    deleteUser($scope.selectedUsers[0]);
                }, function () { });
            }

            function saveUser(user) {
                ipc.send('save-user', user);
            }

            function deleteUser(userToDelete) {
                ipc.send('delete-user', userToDelete);
            }

            /** Ipc Event Handlers */
            $scope.$on('users:updated', function (event, users) {
                $scope.users = users;
                $scope.$apply();
            });

            $scope.$on('users:updated', function (event, users) {
                $scope.users = users;
                $scope.$apply();
            });

            $scope.$on('user:updated', function (event, userUpdated) {
                $log.info(`user: ${userUpdated.name} saved successfully`);
                $log.debug(userUpdated);

                var userToUpdateIndex =
                    _.findIndex($scope.users, ['id', userUpdated.id]);
                _.pullAt($scope.users, userToUpdateIndex);

                if (userToUpdateIndex >= 0) {
                    $scope.users.splice(userToUpdateIndex, 0, userUpdated);
                } else {
                    $scope.users.splice(0, 0, userUpdated);
                    $scope.newUser = {};
                }

                $scope.$apply();
            });

            $scope.$on('user:deleted', function (event, userDeletedId) {
                $log.info(`user: ${$scope.selectedUsers[0].name} deleted successfully`);
                $log.debug(`user deleted id: ${userDeletedId}`);

                var userToDeleteIndex =
                    _.findIndex($scope.users, ['id', userDeletedId]);
                _.pullAt($scope.users, userToDeleteIndex);

                $scope.selectedUsers = [];
                $scope.$apply();
            });
        }]);
})();