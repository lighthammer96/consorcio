/**
 * Created by Admin on 07/08/2017.
 */

$(function () {
    // tree view
    $.fn.extend({
        treed: function (o) {

            var openedClass = 'glyphicon-minus-sign';
            var closedClass = 'glyphicon-plus-sign';

            if (typeof o != 'undefined') {
                if (typeof o.openedClass != 'undefined') {
                    openedClass = o.openedClass;
                }
                if (typeof o.closedClass != 'undefined') {
                    closedClass = o.closedClass;
                }
            }

            //initialize each of the top levels
            var tree = $(this);
            tree.addClass("tree");
            tree.find('li').has("ul").each(function () {
                var branch = $(this); //li with children ul
                branch.prepend("<i class='indicator glyphicon " + closedClass + "'></i>");
                branch.addClass('branch');
                branch.on('click', function (e) {
                    if (this == e.target) {
                        var icon = $(this).children('i:first');
                        icon.toggleClass(openedClass + " " + closedClass);
                        $(this).children().children().toggle();
                    }
                });
                branch.children().children().toggle();
            });
            //fire event from the dynamically added icon
            tree.find('.branch .indicator').each(function () {
                $(this).on('click', function () {
                    $(this).closest('li').click();
                });
            });
            //fire event to open branch if the li contains an anchor instead of text
            tree.find('.branch>a').each(function () {
                $(this).on('click', function (e) {
                    $(this).closest('li').click();
                    e.preventDefault();
                });
            });
            //fire event to open branch if the li contains a button instead of text
            tree.find('.branch>button').each(function () {
                $(this).on('click', function (e) {
                    $(this).closest('li').click();
                    e.preventDefault();
                });
            });
        }
    });
});

function createTree(data_tree, div_master, div_tree, callback) {
    var dataTree = $('<ul id="' + div_tree + '"></ul>');
    $.each(data_tree, function (idx, item) {
        var li = $('<li></li>');
        if (typeof item.nodes != 'undefined') {
            li.append('<a href="javascript:void(0)">' + item.code + '-' + item.text + '</a>');
            var li_h = $('<ul></ul>');
            $.each(item.nodes, function (idx2, item2) {
                var li2 = $('<li></li>');
                if (typeof item2.nodes != 'undefined') {
                    li2.append('<a href="javascript:void(0)">' + item2.code + '-' + item2.text + '</a>');
                    var li_h2 = $('<ul></ul>');
                    $.each(item2.nodes, function (idx3, item3) {
                        var li3 = $('<li></li>');
                        if (typeof item3.nodes != 'undefined') {
                            li3.append('<a href="javascript:void(0)">' + item3.code + '-' + item3.text + '</a>');
                            var li_h3 = $('<ul></ul>');
                            $.each(item3.nodes, function (idx4, item4) {
                                var li4 = $('<li></li>');
                                li4.append('<a id="level' + item4.id + '" class="level-tree" href="javascript:void(0)">' + item4.id + '-' + item4.text + '</a>');
                                var add_p = $('<a class="add-lp" data-id="' + item4.id + '" data-title="' + item4.text + '" href="javascript:void(0)"> <span class="fa fa-plus-circle"></span></a>');
                                li4.append(add_p);
                                var li_h4 = $('<ul class="ul_level' + item4.id + '"></ul>');
                                li4.append(li_h4);
                                li_h3.append(li4);
                            });
                            li3.append(li_h3);
                        } else {
                            li3 = $('<li>' + item3.code + '-' + item3.text + '</li>');
                        }
                        li_h2.append(li3);
                    });
                    li2.append(li_h2);
                } else {
                    li2 = $('<li>' + item2.code + '-' + item2.text + '</li>');
                }
                li_h.append(li2);
            });
            li.append(li_h);
        } else {
            li = $('<li>' + item.code + '-' + item.text + '</li>');
        }
        dataTree.append(li);
    });
    $('#' + div_master).html(dataTree);
    if (typeof callback == 'function') {
        callback();
    }
}

function createTreeSelect(data_tree, div_master, div_tree, class_click, class_label, name_inp, callback) {
    var dataTree = $('<ul id="' + div_tree + '"></ul>');
    $.each(data_tree, function (idx, item) {
        var li = $('<li class="'+class_click+'" data-id="'+item.code+'"></li>');
        if (typeof item.nodes !== 'undefined' && item.nodes.length > 0) {
            li.append('<a data-target="#">' + item.text + '</a>');
            var li_h = $('<ul></ul>');
            $.each(item.nodes, function (idx2, item2) {
                var li2 = $('<li class="'+class_click+'" data-id="'+item2.code+'"></li>');
                if (typeof item2.nodes !== 'undefined' && item2.nodes.length > 0) {
                    li2.append('<a data-target="#">' + item2.text + '</a>');
                    var li_h2 = $('<ul></ul>');
                    $.each(item2.nodes, function (idx3, item3) {
                        var li3 = $('<li class="'+class_click+'" data-id="'+item3.code+'"></li>');
                        if (typeof item3.nodes !== 'undefined' && item3.nodes.length > 0) {
                            li3.append('<a data-target="#">'+item3.text+'</a>');
                            var li_h3 = $('<ul></ul>');
                            $.each(item3.nodes, function (idx4, item4) {
                                li_h3.append(generateCheckTreed(class_label, name_inp, item3.code, item3.type, item4));
                            });
                            li3.append(li_h3);
                        } else {
                            li3 = generateCheckTreed(class_label, name_inp, item2.code, item3.type, item3);
                        }
                        li_h2.append(li3);
                    });
                    li2.append(li_h2);
                } else {
                    li2 = generateCheckTreed(class_label, name_inp, item.code, item2.type, item2);
                }
                li_h.append(li2);
            });
            li.append(li_h);
        } else {
            li = $('<li>' + item.text + '</li>');
        }
        dataTree.append(li);
    });
    $('#' + div_master).html(dataTree);
    $('#' + div_tree).css({
        'min-height': '120px',
        'max-height': '400px',
        'overflow-y': 'auto'
    }).treed({
        openedClass:'glyphicon-folder-open',
        closedClass:'glyphicon-folder-close'
    });
    $('.' + class_click).click(function (e) {
        var that_ = $(this);
        if (!that_.hasClass('generate_tree')) {
            var d_code = that_.attr('data-id');
            that_.addClass('generate_tree');
            generateRadio('.'+class_label+d_code);
        }
        e.preventDefault();
    });
    if (typeof callback === 'function') {
        callback();
    }
}

function generateCheckTreed(class_label, name_inp, code_parent, type, info)
{
    var li = $('<li></li>');
    var lbl = $('<label class="m-b-0 '+class_label+code_parent+' pointer"></label>');
    var inp = $('<input type="radio" name="'+name_inp+'" value="'+info.code+'" data-type="'+type+'" ' +
        'data-um="'+info.um+'" data-text="'+info.description+'" data-text-full="'+info.text+'">');
    var span = $('<span class="m-l-5">'+info.text+'</span>');
    lbl.append(inp).append(span);
    li.append(lbl);
    return li;
}

function closeTreed(tree_id) {
    $('#'+tree_id).find('.indicator.glyphicon-folder-open').click();
}