import blogModule from '../blogModule';

class ArticleController {

    /*ngInject*/
    constructor($state, $stateParams, ArticleResource, toastr, AuthenticationService) {
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.articleResource = ArticleResource;
        this.toastr = toastr;
        this.AuthenticationService = AuthenticationService;
        this.user = AuthenticationService.user;

        // Define column grid
        this.columnDefs = [
            {
                headerName: "No.",
                //field: "codigoReferencia",
                width: 55,
                minWidth: 55,
                maxWidth: 55,
                cellRenderer: function (params) {
                    return '<div class="text-center">' + (parseInt(params.rowIndex) + 1) + '</div>';
                }
            }, {
                headerName: "Article name",
                field: "title",
                filter: 'text',
                cellRenderer: function (params) {
                    return '<span class="pull-left block-ml5">' + params.value + '</span>';
                }
            }, {
                headerName: "Create at",
                field: "created",
                filter: 'text',
                width: 255,
                minWidth: 255,
                maxWidth: 255,
                template: '<div class="block-ml5">' +
                '<span class="block-mr5">{{data.created | date: "medium"}}</span>' +
                '</div>'
                //cellRenderer: function (params) {
                //    return '<span class="pull-left block-ml5">' + params.value + '</span>';
                //}
            }, {
                headerName: "Operations",
                //field: "active",
                width: 120,
                minWidth: 120,
                maxWidth: 120,
                template: '<div class="text-center">' +
                '<span class="block-mr5"><button class="btn btn-xs btn-info" ng-click="articleCtrl.edit({articleId: data._id})"><i class="fa fa-pencil"></i></button></span>' +
                '<span class="block-mr5"><button class="btn btn-xs btn-danger" ng-click="articleCtrl.remove(data)"><i class="fa fa-trash-o"></i></button></span>' +
                '</div>'
            }, {
                headerName: "",
                width: 20,
                maxWidth: 20,
                minWidth: 20
            }];

        this.gridOptions = {
            columnDefs: this.columnDefs,
            onGridReady: () => {
                this.gridOptions.api.sizeColumnsToFit();
            },
            rowData: [],
            localeText: {
                page: 'de',
                more: 'mas',
                to: 'al',
                of: 'del',
                next: 'Siguiente',
                last: '&Uacute;ltimo',
                first: 'Primera',
                previous: 'Anterior',
                // for set filter
                selectAll: 'Seleccionar todo',
                searchOoo: 'Buscar...',
                blanks: 'Sin registros',
                // for number filter
                equals: 'Igual a',
                lessThan: 'Menos que',
                greaterThan: 'Mayor que',
                filterOoo: 'Filtrar...',
                // for text filter
                contains: 'Contiene',
                startsWith: 'Comienza con',
                endsWith: 'Termina con',
                // the header of the default group column
                group: 'Grupo',
                // tool panel
                columns: 'Columnas',
                pivotedColumns: 'Columnas articuladas',
                pivotedColumnsEmptyMessage: 'Por favor arrastre la columna aqu�',
                valueColumns: 'Valor de la columnas',
                valueColumnsEmptyMessage: 'Por favor arrastre la columna aqu�'
            },
            rowSelection: 'single',
            angularCompileRows: true,
            enableColResize: true,
            enableSorting: true,
            enableFilter: true,
            onCellDoubleClicked: (row) => {
                this.edit({articleId: row.data._id})
            },
            //onSelectionChanged: this.selectionChangeCallback,
            rowHeight: 25,
            onModelUpdated: () => {
                var model = this.gridOptions.api.getModel();
                var totalRows = this.gridOptions.rowData.length;
                var processedRows = model.getVirtualRowCount();
                if (totalRows && processedRows) {
                    this.rowFiltered = processedRows.toLocaleString();
                } else {
                    this.rowFiltered = 0;
                }
            },
        };
    }

    create() {
        var article = new this.articleResource(this.article);
        //console.log("article", article);
        // Redirect after save
        article.$save((response) => {
            this.$state.transitionTo('article-list');
            this.toastr.success("Article saved.");
        }, function (errorResponse) {
            console.log("errorResponse", errorResponse);
            this.toastr.error(errorResponse.message.message);
        });
    }

    find() {
        this.articles = this.articleResource.query((response) => {
            //console.log("response", response);
            if (this.gridOptions.api) {
                this.gridOptions.api.setRowData(response);
            }
        });
    }

    // Find existing Article
    findOne() {
        this.article = this.articleResource.get({
            articleId: this.$stateParams.articleId
        });
    }

    edit(article) {
        this.$state.transitionTo('edit-article', article);
    }

    update() {
        this.article.$update(() => {
            this.$state.transitionTo('article-list');
            this.toastr.success("Article saved.");
        }, (errorResponse) => {
            console.log("errorResponse", errorResponse);
            this.toastr.error(errorResponse.message.message);
        });
    }

    remove(article) {
        if (confirm('Are you sure you want to delete this article?')) {
            if (article) {
                article.$remove();
                this.articles.splice(this.articles.indexOf(article), 1);
                this.gridOptions.api.setRowData(this.articles);
            } else {
                this.article.$remove(() => {
                    this.$state.transitionTo('article-list');
                });
            }
        }
    }


}

blogModule.controller('ArticleController', ArticleController);

export default blogModule;
