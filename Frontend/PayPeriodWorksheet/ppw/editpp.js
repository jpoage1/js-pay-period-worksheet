<table>
<tr class="{$myWorkSheet->altN}">
<th>

$myWorkSheet->altN = "1";
$myWorkSheet->worksheet_name = $worksheet_name;
<h1>".$myWorkSheet->worksheet_name."</h1>
<form method=get>
<table>
<tr>
<td>Salon</td>
<td>Stylist</td>
<td>Pay Period Date</td>
<td></td>
</tr>
<tr>
<td>";$myWorkSheet->dropMenu('salon_id', 'showStylists(this.value)', 'salons', 'salon_id', 'salon_name'); </td>
<td>";$myWorkSheet->dropMenu('stylist_id', 'showPayPeriods(this.value)', 'stylists', 'stylist_id', 'stylist_name'); </td>
echo "<td><select name=\"pp_date\" id=\"pp_date\">

$sql = "SELECT DISTINCT pp_date FROM pay_period"
                        ." WHERE "
                        .(
                            !empty($myWorkSheet->salon_id) ? "salon_id = '{$myWorkSheet->salon_id}' AND " : '' )
                        .(
                            !empty($myWorkSheet->stylist_id) ? "stylist_id = '{$myWorkSheet->stylist_id}' AND " : '' )
                        ."1 = 1";
$result = $myWorkSheet->conn->query($sql);
echo "<option>&nbsp;</option>";
if ( $result->num_rows > 0 )
{
    while ( $row = $result->fetch_assoc() )
    {
        <option value=".current($row)."
        if ( current($row) == $myWorkSheet->pp_date )
        {
             selected="selected"
        }
        >".current($row)."</option>
    }
}
</select></td>
<td><input type="submit" /></td>
</tr>
</table>
</form>
</th>
<th>Pay Period Date</th>
<th>Product Hours</th>
<th>Non-Product Hours</th>
<th>Hourly Base</th>";
<th>Commissionable Service Revenue</th>
<th>Service Commission Rate</th>
<th>Product Sales</th>
if ( count($myWorkSheet->worksheetData['stylists']) == 1 )
    <th>Stylist Average</th>
if ( is_array($myWorkSheet->worksheetData['stylists']) && !empty($myWorkSheet->worksheetData['stylists']) )
foreach ( $myWorkSheet->worksheetData['stylists'] as $column )
{
    <th>".$column['stylist_name']."</th>
}
</tr>

</table>
?>