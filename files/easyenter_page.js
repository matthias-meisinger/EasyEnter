/**
 * # Mantis Plugin "EasyEnter" # Copyright (C) 2015 Frithjof Gnas -
 * fg@prae-sensation.de # # Javascript functions and calls to slim down the
 * bug-report-form on the # configured base of include_fields, field_values
 * etc.. # # Disclaimer & License: # This plugin - EasyEnter - is distributed in
 * the hope that it will be useful, # but WITHOUT ANY WARRANTY; without even the
 * implied warranty of # MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the # GNU General Public License for more details. # # You should have
 * received a copy of the GNU General Public License # along with MantisBT. If
 * not, see <http://www.gnu.org/licenses/>.
 */

/*
 * Function calls, plugin execution
 */
populate_field_values();
hide_all_fields_show_include_fields();

/*
 * Functions
 */
/**
 * Set the values defined in "easyenter_config" for the corresponding fields
 * TODO: Implemet jQuery-populate-plugin
 */
function populate_field_values() {
	if (!easyenter_config.hasOwnProperty('field_values')) {
		return;
	}

	for (field_name in easyenter_config.field_values) {
		var thisInputfield = jQuery('[name="' + field_name + '"]');
		if (thisInputfield.length < 1) {
			continue;
		}
		if (!easyenter_config.field_values.hasOwnProperty(field_name)) {
			continue;
		}

		// radio buttons need special actions, the radio button with
		// "field_name"
		// AND the configured field_value should get the attribute "checked"
		if (thisInputfield.attr('type') == 'radio') {
			thisInputfield = jQuery('[name="' + field_name + '"][value="'
					+ easyenter_config.field_values[field_name] + '"]');
			thisInputfield.attr('checked', 'checked');
			continue;
		}
		// Single checkboxes are checked when their field_value is "CHECKED"
		if (thisInputfield.attr('type') == 'checkbox') {
			if ('CHECKED' == easyenter_config.field_values[field_name]) {
				thisInputfield.attr('checked', 'checked');
				continue;
			}
		}
		thisInputfield.val(easyenter_config.field_values[field_name]);
	}
}

/**
 * Hides all fields in "report_bug_form"-form and shows the defined
 * "include_fields" afterwards
 */
function hide_all_fields_show_include_fields() {
	var i = 0;

	if (!easyenter_config.hasOwnProperty('include_fields')) {
		return;
	}
	if (easyenter_config.include_fields.length < 1) {
		return;
	}

	var form = jQuery('form[name="report_bug_form"]');

	// Hide all fields, except the hidden ones, submit/reset buttons
	$('div.field-container').each(
			function() {
				$(this).hide();

				if (easyenter_config.include_fields.includes($(this).find(
						"[id]")[0].id)) {
					$(this).show();
				}
			});

}

/**
 * Show or hide a table row holding input with given name and label as well
 * 
 * @param field_name
 *            name of the input of which the parent row should be hidden
 * @param showrow
 *            1=show row | 0 = hide
 */
function showhide_input_field_row(field_name, showrow) {
	var field = jQuery('[name="' + field_name + '"]');
	if (field.length < 1) {
		return;
	}

	if (showrow == 1) {
		field.parents('tr').show();
	} else {
		field.parents('tr').hide();
	}
}

/**
 * Hides the row for entering a custom profile, this is not covered by
 * hide_all_fields_... because in the corresponding row is no input
 */
function hide_custom_profile_row() {
	jQuery('#profile_closed').parent('td').parent('tr').hide();
}

/**
 * Hide all elements with CSS-class "required" which means hide all asterisks as
 * well as the notice "* means mandatory field"
 */
function hide_mandatory_asterisks() {
	jQuery('span.required').hide();
}
