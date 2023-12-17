frappe.listview_settings['Job Card'] = {
	has_indicator_for_draft: true,
	hide_name_column: true,
	add_fields: ['operation', 'status', 'work_order', 'sampling_work_order', 'order_form_qcs'],

	get_indicator: function(doc) {
		const status_colors = {
			"Work In Progress": "orange",
			"Completed": "green",
			"Cancelled": "red",
			"Material Transferred": "blue",
			"Open": "red",
		};
		const status = doc.status || "Open";
		const color = status_colors[status] || "blue";

		return [__(status), color, `status,=,${status}`];
	},
	onload: function (listview) {
		listview.page.add_menu_item(__("Resume all paused Jobs"), function (frm) {
			frappe.msgprint("Resume all paused Jobs! Please Wait")
			const args = {
				start_time: frappe.datetime.now_datetime(),
				doc_status:"Work In Progress"
				
			};
			frappe.call({
				method: "hanayen_qcs.controller.hanayen_controller.time_table",
				args: {
					args: args			
				},
				callback: function () {
					listview.refresh();
				},
			});
		});
		listview.page.add_menu_item(__("Pause running Jobs"), function (frm) {
			frappe.msgprint("Pause running Jobs! Please Wait")
			const args = {
				complete_time: frappe.datetime.now_datetime(),
				doc_status:"On Hold"
			};
			frappe.call({
				method: "hanayen_qcs.controller.hanayen_controller.time_table",
				args: {
					args: args			
				},
				callback: function () {
					listview.refresh();
				},
			});
		});
	},
};
