def extract_decision_path(model, X, feature_names):
    tree = model.tree_
    node_indicator = model.decision_path(X)
    leaf_id = model.apply(X)

    steps = []
    node_index = node_indicator.indices[
        node_indicator.indptr[0]: node_indicator.indptr[1]
    ]

    for node_id in node_index[:5]:
        if tree.feature[node_id] != -2:
            feature = feature_names[tree.feature[node_id]]
            threshold = tree.threshold[node_id]
            value = X.iloc[0, tree.feature[node_id]]

            steps.append({
                "feature": feature,
                "condition": f"{feature} <= {threshold:.2f}",
                "value": round(value, 2)
            })

    return steps
