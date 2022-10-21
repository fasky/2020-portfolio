Vue.component('footer-2',{
    props:['year','name'],
    template: `<footer class="muted" style="text-align:center">
           &copy; {{year}} {{name}}
           </footer>`
});

Vue.component('header-state',{
    props:['title','state'],
    template: `<div class="myheader">
<h1 class="display-5">{{title}} - {{state}}</h1>
        </div>`
});

Vue.component('img-display-row',{
    props:['imgs','descriptions'],
    template:`
        <div>
			<div class="col-md-12">
			<table id="dataTable">
                <tr>
                    <td v-for="item in imgs"><img v-bind:src=item.data></td>
                </tr>
                <tr>
                    <td v-for="item in descriptions">{{item.data}}</td>
                </tr>
            </table>
			</div>
		</div> <!-- end row -->`
});