exports.needsSignature = doclet => {
    let needsSig = false

    // function and class definitions always get a signature
    if (doclet.kind === 'function' || doclet.kind === 'class') {
        needsSig = true
    } else if (
        doclet.kind === 'typedef' &&
        doclet.type &&
        doclet.type.names &&
        doclet.type.names.length
    ) {
        // typedefs that contain functions get a signature, too
        needsSig = doclet.type.names.some(name => name.toLowerCase() === 'function')
    }

    return needsSig
}

const getSignatureAttributes = item => {
    const attributes = []

    if (item.optional) {
        attributes.push('<Doc.Opt>opt</Doc.Opt>')
    }

    if (item.nullable === true) {
        attributes.push('nullable')
    } else if (item.nullable === false) {
        attributes.push('non-null')
    }

    return attributes
}

const updateItemName = item => {
    const attributes = getSignatureAttributes(item)

    let itemName = item.name || ''

    if (item.variable) {
        itemName = `&hellip;${itemName}`
    }

    if (attributes.length) {
        itemName = `${itemName} ${attributes.join(', ')}`
    }

    return itemName
}

const addParamsAttributes = params => {
    return params
        .filter(({ name }) => name && !name.includes('.'))
        .map(updateItemName)
}


exports.addSignatureParams = doclet => {
    const params = doclet.params ? addParamsAttributes(doclet.params) : []

    doclet.signature = `${doclet.signature || ''}(${params.join(', ')})`
}

exports.addReturns = doclet => {
    var attribs           = []
    var attribsString     = ""
    var returnTypes       = []
    var returnTypesString = ""

    // jam all the return-type attributes into an array. this could create odd results (for example,
    // if there are both nullable and non-nullable return types), but let's assume that most people
    // who use multiple @return tags aren't using Closure Compiler type annotations, and vice-versa.
    if (f.returns) {
        f.returns.forEach(function (item) {
            helper.getAttribs(item).forEach(function (attrib) {
                if (attribs.indexOf(attrib) === -1) {
                    attribs.push(attrib)
                }
            })
        })

        attribsString = buildAttribsString(attribs)
    }

    if (f.returns) {
        returnTypes = addNonParamAttributes(f.returns)
    }
    if (returnTypes.length) {
        returnTypesString = util.format(
            " &rarr; %s{%s}",
            attribsString,
            returnTypes.join("|")
        )
    }

    f.signature =
        '<span class="signature">' +
        (f.signature || "") +
        "</span>" +
        '<span class="type-signature">' +
        returnTypesString +
        "</span>"
}